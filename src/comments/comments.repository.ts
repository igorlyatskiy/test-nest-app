import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { UpdateCommentDto } from './dto/update-comment-dto';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  private logger = new Logger('CommentsRepository');

  async getComment(commentId: string) {
    try {
      this.logger.log('Getting the comment');
      return await this.findOne({ where: { commentId } });
    } catch (error) {
      this.logger.error('Unhandled error at the getComment method', error);
    }
  }

  async addComment(user: User, post: Post, dto: CreateCommentDto) {
    const { body } = dto;
    try {
      this.logger.log('Adding the comment');
      const comment = new Comment();
      comment.postId = post.postId;
      comment.userId = user.userId;
      comment.body = body;

      return await this.save(comment);
    } catch (error) {
      this.logger.error('Unhandled error at the addComment method', error);
      throw new InternalServerErrorException();
    }
  }

  async updateComment(commentId: string, dto: UpdateCommentDto) {
    const { body } = dto;
    try {
      this.logger.log('Updating the comment');
      await this.save({
        commentId,
        body,
      });

      return await this.getComment(commentId);
    } catch (error) {
      this.logger.error('Unhandled error at the updateComment method', error);
      throw new InternalServerErrorException();
    }
  }

  async deleteComment(commentId: string) {
    try {
      const comment = await this.getComment(commentId);
      await this.delete({ commentId });

      return comment;
    } catch (error) {
      this.logger.error('Unhandled error at the deleteComment method', error);
      throw new InternalServerErrorException();
    }
  }
}
