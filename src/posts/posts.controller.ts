import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { ExtendedRequest } from '../users/interfaces/extended-request.interface';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Post()
  addPost(
    @Req() req: ExtendedRequest,
    @Body() createPostDTO: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.addPost(createPostDTO, req.user);
  }
}
