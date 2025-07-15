import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Destinations } from './destinations.Entity';
import { DestinationsService } from './destinations.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LoginResponse } from 'src/auth/auth.service';

@Controller('api/destinations')
export class DestinationsController {
  constructor(private readonly destinations: DestinationsService) {}

  @Get('/:id')
  async getDestinationById(
    @Param('id') id: string,
  ): Promise<Destinations | null> {
    const ID = Number(id);

    const destination = await this.destinations.getDestinationById(ID);
    if (!destination) {
      return null;
    }

    return destination;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDestination(
    @Request() req: { user: LoginResponse },
    @Body() destinationData: Partial<Destinations>,
  ): Promise<Destinations> {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const createPostData = {
      ...destinationData,
      userId: req.user.id,
      username: req.user.username,
    };

    return this.destinations.createDestination(createPostData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteDestination(
    @Param('id') id: string,
    @Request() req: { user: LoginResponse },
  ): Promise<void> {
    const ID = Number(id);
    await this.destinations.deleteDestination(ID, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateDestination(
    @Param('id') id: string,
    @Request() req: { user: LoginResponse },
    @Body() destinationData: Partial<Destinations>,
  ): Promise<Destinations | null> {
    const ID = Number(id);
    return this.destinations.updateDestination(ID, destinationData, req.user);
  }
}
