import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@EntityRepository(PostEntity)
export class PostsRepository extends Repository<PostEntity> {
  async getAllPosts(): Promise<PostEntity[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addPost(createPostDTO: CreatePostDto): Promise<PostEntity> {
    try {
      const { body, title } = createPostDTO;
      const post = new PostEntity();
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
