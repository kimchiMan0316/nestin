import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './DTO/auth.login.DTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDTO,
  ): Promise<{ message: string; status: number }> {
    try {
      const login = await this.authService.validateUser(
        authLoginDto.userId,
        authLoginDto.password,
      );

      if (!login) {
        throw new Error('로그인 실패');
      }
      return { message: '로그인 성공', status: 200 };
    } catch (error) {
      throw new Error('로그인 실패: ' + error);
    }
  }
}
