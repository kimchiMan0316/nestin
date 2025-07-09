import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(uuid: string) {
    return this.userRepository.findOne({ where: { id: uuid } });
  }

  async post(userInf: CreateUserDto) {
    const newData = this.userRepository.create(userInf);

    return this.userRepository.save(newData);
  }

  async delete(id: string) {
    return this.userRepository.delete({ id: id });
  }

  async getAll() {
    return this.userRepository.find();
  }
}
