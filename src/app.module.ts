import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      exclude: ['/api'], // /api 로 시작하는 경로는 Nest API로 처리
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'park', // 네 postgres 유저명
      password: 'pp0316', // 네 postgres 비번
      database: 'untity_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발용: 엔티티 변경 시 테이블 자동 동기화 (운영 환경에선 false)
      logging: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
