import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DestinationCommentService } from './destination_comment.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Destination_Comment } from './destination_comment.Entity';
import { LoginResponse } from 'src/auth/auth.service';

@Controller('api/destination-comment')
export class DestinationCommentController {
  constructor(
    private readonly destinationCommentService: DestinationCommentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postComment(
    @Request() req: { user: LoginResponse },
    @Body() body: Partial<Destination_Comment>,
  ) {
    return this.destinationCommentService.createDestinationComment(
      body,
      req.user,
    );
  }
}
