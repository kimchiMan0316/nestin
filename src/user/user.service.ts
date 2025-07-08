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

  get(id: string) {
    const ID = Number(id);
    return this.userRepository.findOne({ where: { id: ID } });
  }

  post(userInf: CreateUserDto) {
    const newData = this.userRepository.create(userInf);

    return this.userRepository.save(newData);
  }

  delete(id: number) {
    const ID = Number(id);
    if (isNaN(ID)) {
      throw new Error('ID는 숫자여야 합니다.');
    }
    if (ID <= 0) {
      throw new Error('ID는 0보다 큰 숫자여야 합니다.');
    }
    return this.userRepository.delete({ id: ID });
  }

  getAll() {
    return this.userRepository.find();
  }
}
