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
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      return null;
    }
    const result = {
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
      gender: user.gender,
      age: user.age,
      state: user.state,
      createAt: user.createAt,
    };
    return result;
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

  async updateProfilePhoto(id: string, photoUrl: string) {
    const user = await this.userRepository.update(
      { id },
      { profilePhoto: photoUrl },
    );

    if (!user.affected) {
      throw new Error('User not found or update failed');
    }

    return { message: 'Profile photo updated successfully' };
  }
}
