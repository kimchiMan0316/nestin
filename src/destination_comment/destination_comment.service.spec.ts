import { Test, TestingModule } from '@nestjs/testing';
import { DestinationCommentService } from './destination_comment.service';

describe('DestinationCommentService', () => {
  let service: DestinationCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinationCommentService],
    }).compile();

    service = module.get<DestinationCommentService>(DestinationCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
