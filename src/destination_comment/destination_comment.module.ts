import { Module } from '@nestjs/common';
import { DestinationCommentController } from './destination_comment.controller';
import { DestinationCommentService } from './destination_comment.service';

@Module({
  controllers: [DestinationCommentController],
  providers: [DestinationCommentService],
})
export class DestinationCommentModule {}
