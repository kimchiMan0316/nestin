import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Assuming User is the entity for user data
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(userId: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return false;
    }

    if (user.userId === userId && user.password === password) {
      return true;
    }
    return false;
  }
}
