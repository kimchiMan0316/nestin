import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    Logger.log(
      `[Request Arrived] Method: ${req.method}, URL: ${req.url}`,
      'GlobalRequestLogger',
    );
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 프론트 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false, // 쿠키, 인증정보 허용 여부
  });
  app.use(cookieParser()); // 쿠키 파서 미들웨어 추가
  app.use(morgan('combined')); // Apache 스타일 로그 찍힘
}
bootstrap();
