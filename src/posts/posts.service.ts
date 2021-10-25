import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  async addPost(createPostDTO: CreatePostDto): Promise<Post> {
    const user = this.request.user as User;
    return this.postsRepository.addPost(createPostDTO, user.userId);
  }
}
