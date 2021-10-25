import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.find();
    } catch (error) {
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
      await this.save(post);
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
