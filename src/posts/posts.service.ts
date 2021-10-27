import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  async addPost(createPostDTO: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.addPost(createPostDTO, user.userId);
  }
}
