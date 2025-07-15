import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginResponse } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1234',
    });
  }

  validate(payload: LoginResponse) {
    console.log('🔥 JwtStrategy.validate() 호출됨!', payload);
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
