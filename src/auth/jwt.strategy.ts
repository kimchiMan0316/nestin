import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginResponse } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey',
    });
  }

  validate(payload: LoginResponse) {
    Logger.log(
      '---------- JwtStrategy validate 호출됨 ----------',
      'JwtStrategy',
    );
    Logger.log('수신된 JWT payload:', payload, 'JwtStrategy'); // payload 내용 확인
    return {
      id: payload.id,
      username: payload.username,
      state: payload.state,
      userId: payload.userId,
      profilePhoto: payload.profilePhoto || null,
      age: payload.age,
    };
  }
}
