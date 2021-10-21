import { Body, Controller, Get, Post } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@Controller('posts')
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
