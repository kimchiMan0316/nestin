import { Test, TestingModule } from '@nestjs/testing';
import { DestinationCommentController } from './destination_comment.controller';

describe('DestinationCommentController', () => {
  let controller: DestinationCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinationCommentController],
    }).compile();

    controller = module.get<DestinationCommentController>(DestinationCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
