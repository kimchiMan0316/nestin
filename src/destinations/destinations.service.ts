import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destinations } from './destinations.Entity';
import { Repository } from 'typeorm';
import { LoginResponse } from 'src/auth/auth.service';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destinations)
    private readonly DestinationRepository: Repository<Destinations>,
  ) {}

  async getAllDestinations(): Promise<Destinations[]> {
    return this.DestinationRepository.find();
  }

  async getDestinationById(id: number): Promise<Destinations | null> {
    const destination = await this.DestinationRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!destination) {
      return null;
    }

    await this.DestinationRepository.increment({ id }, 'views', 1);

    return destination;
  }

  async createDestination(
    destinationData: Partial<Destinations>,
  ): Promise<Destinations> {
    const newDestination = this.DestinationRepository.create(destinationData);
    return this.DestinationRepository.save(newDestination);
  }

  async updateDestination(
    id: number,
    destinationData: Partial<Destinations>,
    user: LoginResponse,
  ): Promise<Destinations | null> {
    const destination = await this.DestinationRepository.findOne({
      where: { id },
    });
    if (!destination) {
      return null;
    }
    if (destination.userId !== user.id) {
      return null;
    }
    Object.assign(destination, destinationData);
    return this.DestinationRepository.save(destination);
  }

  async deleteDestination(id: number, user: LoginResponse): Promise<void> {
    const destination = await this.DestinationRepository.findOne({
      where: { id },
    });
    if (destination === null) {
      return;
    }
    if (user.id !== destination.userId) {
      return;
    }
    const result = await this.DestinationRepository.delete({ id });
    if (result.affected === 0) {
      throw new Error('Destination not found');
    }
  }
}
