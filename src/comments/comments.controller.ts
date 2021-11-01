import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ExtendedRequest } from '../users/interfaces/extended-request.interface';
import { CreateCommentDto } from './dto/create-comment-dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment-dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {
  }

  @Post('/:postId/comments')
  addComment(
    @Param('postId') postId: string,
    @Req() req: ExtendedRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.addComment(req.user, postId, createCommentDto);
  }

  @Put('/:postId/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Req() req: ExtendedRequest,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(
      req.user,
      commentId,
      updateCommentDto,
    );
  }

  @Delete('/:postId/comments/:commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: ExtendedRequest,
  ) {
    return this.commentsService.deleteComment(req.user, commentId);
  }
}
