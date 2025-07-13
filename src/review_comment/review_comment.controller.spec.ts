import { Test, TestingModule } from '@nestjs/testing';
import { ReviewCommentController } from './review_comment.controller';

describe('ReviewCommentController', () => {
  let controller: ReviewCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewCommentController],
    }).compile();

    controller = module.get<ReviewCommentController>(ReviewCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
