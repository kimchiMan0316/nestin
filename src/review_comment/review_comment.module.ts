import { Module } from '@nestjs/common';
import { ReviewCommentController } from './review_comment.controller';
import { ReviewCommentService } from './review_comment.service';

@Module({
  controllers: [ReviewCommentController],
  providers: [ReviewCommentService]
})
export class ReviewCommentModule {}
