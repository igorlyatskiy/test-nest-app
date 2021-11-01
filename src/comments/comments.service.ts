import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentsRepository } from './comments.repository';
import { User } from '../users/user.entity';
import { CreateCommentDto } from './dto/create-comment-dto';
import { PostsRepository } from '../posts/posts.repository';
import { UpdateCommentDto } from './dto/update-comment-dto';

@Injectable()
export class CommentsService {
  private logger = new Logger('CommentsService');

  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {
  }

  async addComment(user: User, postId: string, dto: CreateCommentDto) {
    const post = await this.postsRepository.getPost(postId);
    return this.commentsRepository.addComment(user, post, dto);
  }

  async updateComment(
    user: User,
    commentId: string,
    dto: UpdateCommentDto,
  ) {
    const comment = await this.commentsRepository.getComment(commentId);

    if (comment.userId !== user.userId) {
      throw new ForbiddenException();
    }

    return this.commentsRepository.updateComment(commentId, dto);
  }

  async deleteComment(user: User, commentId: string) {
    const comment = await this.commentsRepository.getComment(commentId);

    if (comment.userId !== user.userId) {
      throw new ForbiddenException();
    }

    return this.commentsRepository.deleteComment(commentId);
  }
}
