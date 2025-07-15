import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination_Comment } from './destination_comment.Entity';
import { Repository } from 'typeorm';
import { LoginResponse } from 'src/auth/auth.service';

@Injectable()
export class DestinationCommentService {
  constructor(
    @InjectRepository(Destination_Comment)
    private readonly destination_comment: Repository<Destination_Comment>,
  ) {}

  async createDestinationComment(
    body: Partial<Destination_Comment>,
    user: LoginResponse,
  ) {
    // 토큰까서 유효성 검사 조지기
    const id = Number(user.id);

    const vaildateCheck = await this.destination_comment.findOne({
      where: { id },
    });
    if (vaildateCheck === null) {
      return null;
    }
    const newComment = {
      ...body,
      userId: user.id,
    };

    const comment = this.destination_comment.create(newComment);
    return this.destination_comment.save(comment);
  }

  async deleteDestinationComment(id: number) {
    const ID = Number(id);
    return this.destination_comment.delete(ID);
  }
}
