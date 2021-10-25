import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getUsers() {
    return this.postsService.getAllPosts();
  }

  @Post()
  addUser(@Body() createPostDTO: CreatePostDto): Promise<PostEntity> {
    return this.postsService.addPost(createPostDTO);
  }
}
