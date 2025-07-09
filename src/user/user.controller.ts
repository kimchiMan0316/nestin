import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDTO } from './DTO/get-user-dto';
import { CreateUserDto } from './DTO/create-user-dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async read(@Param('id') id: string): Promise<GetUserDTO | null> {
    const findUser = await this.userService.get(id);
    if (!findUser) {
      throw new NotFoundException('없는 유저입니당.');
    }
    return findUser;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }

  @Delete()
  delete(@Param() id: string) {
    return this.userService.delete(id);
  }

  @Get()
  async findAll(): Promise<GetUserDTO[]> {
    const users = await this.userService.getAll();
    return users;
  }
}
