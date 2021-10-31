import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublicPostData } from './interfaces/public-post-data.interface';

@Injectable()
export class PostsService {
  private logger = new Logger('PostsService');

  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PublicPostData> {
    const data = await this.postsRepository.createPost(createPostDto, user);
    return this.getPublicPostData(data);
  }

  async getUserPosts(user: User): Promise<Post[]> {
    return this.postsRepository.getAllPosts(user.userId);
  }

  async updatePost(
    updateUserDto: UpdatePostDto,
    user: User,
    postId: string,
  ): Promise<Post> {
    const post = await this.postsRepository.getPost(postId);

    if (post.user.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    return this.postsRepository.updatePost(updateUserDto, postId);
  }

  async deletePost(user: User, postId: string): Promise<Post> {
    const post = await this.postsRepository.getPost(postId);

    if (post.user.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    return this.postsRepository.deletePost(postId);
  }

  getPublicPostData(post: Post) {
    const publicPostData: PublicPostData = {
      postId: post.postId,
      userId: post.user.userId,
      title: post.title,
      body: post.body,
      likes: +post.likes,
      dislikes: +post.dislikes,
    };
    return publicPostData;
  }
}
