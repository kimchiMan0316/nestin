import { Module } from '@nestjs/common';
import { DestinationCommentController } from './destination_comment.controller';
import { DestinationCommentService } from './destination_comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination_Comment } from './destination_comment.Entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Destination_Comment]), AuthModule],
  controllers: [DestinationCommentController],
  providers: [DestinationCommentService],
})
export class DestinationCommentModule {}
