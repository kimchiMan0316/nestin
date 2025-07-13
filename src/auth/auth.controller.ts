import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './DTO/auth.login.DTO';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    message: string;
    status: number;
    username: string;
    profilePhoto?: string | null;
  }> {
    try {
      const login = await this.authService.validateUser(
        authLoginDto.userId,
        authLoginDto.password,
      );

      if (!login || typeof login !== 'object') {
        throw new Error('로그인 실패');
      }

      const accessToken = await this.authService.createToken(login);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 60 * 60 * 1000, // 30 hour
      });

      return {
        message: '로그인 성공',
        username: login.username,
        profilePhoto: login.profilePhoto || null,
        status: 200,
      };
    } catch (error) {
      throw new Error('로그인 실패: ' + error);
    }
  }
}
