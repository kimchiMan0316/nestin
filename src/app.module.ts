import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DestinationsModule } from './destinations/destinations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewCommentModule } from './review_comment/review_comment.module';
import { DestinationCommentModule } from './destination_comment/destination_comment.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // 정적 파일을 제공할 경로
      exclude: ['/api', '/upload'], // API와 겹치는 거만 제외
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      exclude: [
        '/api',
        '/api/auth',
        '/api/auth/token',
        '/api/user',
        '/api/upload',
      ], // /api 로 시작하는 경로는 Nest API로 처리
    }),
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres', // 네 postgres 타입
      host: process.env.DB_HOST, // 네 postgres 호스트
      port: Number(process.env.DB_PORT), // 네 postgres 포트
      username: process.env.DB_USER, // 네 postgres 유저명
      password: process.env.DB_PASS, // 네 postgres 비번
      database: process.env.DB_NAME, // 네 postgres DB명
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발용: 엔티티 변경 시 테이블 자동 동기화 (운영 환경에선 false)
      logging: true,
    }),

    UserModule,
    AuthModule,
    DestinationsModule,
    ReviewsModule,
    ReviewCommentModule,
    DestinationCommentModule,
  ],
})
export class AppModule {}
