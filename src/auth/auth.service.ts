import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.Entity';
import { Repository } from 'typeorm';

export interface LoginResponse {
  id: string;
  username: string;
  state: string;
  userId: string;
  profilePhoto?: string | null;
  age?: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Assuming User is the entity for user data
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    userId: string,
    password: string,
  ): Promise<LoginResponse | boolean> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return false;
    }

    if (user.userId === userId && user.password === password) {
      return {
        id: user.id,
        username: user.username,
        state: user.state,
        userId: user.userId,
      };
    }
    return false;
  }

  createToken(userInf: LoginResponse): string {
    const payload = {
      id: userInf.id,
      username: userInf.username,
      state: userInf.state,
      userId: userInf.userId,
      profilePhoto: userInf.profilePhoto || null,
      age: userInf.age,
    };

    return this.jwtService.sign(payload);
  }
}
