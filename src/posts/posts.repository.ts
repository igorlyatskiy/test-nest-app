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

  async addPost(createPostDTO: CreatePostDto): Promise<Post> {
    try {
      const { body, title } = createPostDTO;
      const post = new Post();
      post.title = title;
      post.body = body;
      post.userId = '2a3a07aa-0f52-43b4-a75e-0e35fe19611d';
      await this.save(post);
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
