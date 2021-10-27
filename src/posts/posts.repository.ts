import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  private logger = new Logger('PostsRepository');

  async getAllPosts(): Promise<Post[]> {
    try {
      this.logger.log('Getting all posts');
      return await this.find();
    } catch (error) {
      this.logger.error('Unhandled error at getAllPosts method', error);
      throw new InternalServerErrorException();
    }
  }

  async addPost(createPostDTO: CreatePostDto, userId: string): Promise<Post> {
    try {
      const { body, title } = createPostDTO;
      const post = new Post();
      post.title = title;
      post.body = body;
      post.userId = userId;

      this.logger.log('Adding the post');

      await this.save(post);
      return post;
    } catch (error) {
      this.logger.error('Unhandled error at addPost method', error);
      throw new InternalServerErrorException();
    }
  }
}
