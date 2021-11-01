import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  private logger = new Logger('PostsRepository');

  async getAllPosts(userId?: string): Promise<Post[]> {
    try {
      this.logger.log('Getting all posts');

      if (userId) {
        return await this.find({
          where: { userId },
          relations: ['comments'],
        });
      }

      return await this.find({ relations: ['comments'] });
    } catch (error) {
      this.logger.error('Unhandled error at getAllPosts method', error);
      throw new InternalServerErrorException();
    }
  }

  async getPost(postId: string): Promise<Post> {
    try {
      this.logger.log('Getting the post');

      return await this.findOne({ where: { postId }, relations: ['comments'] });
    } catch (error) {
      this.logger.error('Unhandled error at getPost method', error);
      throw new InternalServerErrorException();
    }
  }

  async createPost(createPostDTO: CreatePostDto, user: User): Promise<Post> {
    try {
      const { body, title } = createPostDTO;
      const post = new Post();
      post.title = title;
      post.body = body;
      post.user = user;

      this.logger.log('Adding the post');

      await this.save(post);
      return post;
    } catch (error) {
      this.logger.error('Unhandled error at createPost method', error);
      throw new InternalServerErrorException();
    }
  }

  async updatePost(
    updatePostDto: UpdatePostDto,
    postId: string,
  ): Promise<Post> {
    this.logger.log('Updating the post');

    try {
      await this.save({
        postId,
        body: updatePostDto.body,
        title: updatePostDto.title,
      });

      return await this.getPost(postId);
    } catch (error) {
      this.logger.error('Unhandled error at updateUser method', error);
      throw new InternalServerErrorException();
    }
  }

  async deletePost(postId: string): Promise<Post> {
    try {
      this.logger.log('Deleting the comment');
      const post = await this.getPost(postId);

      await this.delete({ postId });
      return post;
    } catch (error) {
      this.logger.error('Unhandled error at updateUser method', error);
      throw new InternalServerErrorException();
    }
  }
}
