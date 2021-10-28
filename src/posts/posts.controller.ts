import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { ExtendedRequest } from '../users/interfaces/extended-request.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('/current')
  getUserPosts(@Req() req) {
    return this.postsService.getUserPosts(req.user);
  }

  @Post()
  createPost(
    @Req() req: ExtendedRequest,
    @Body() createPostDTO: CreatePostDto,
  ) {
    return this.postsService.createPost(createPostDTO, req.user);
  }

  @Put('/:postId')
  updatePost(
    @Req() req: ExtendedRequest,
    @Body() updatePostDto: UpdatePostDto,
    @Param('postId') postId: string,
  ) {
    return this.postsService.updatePost(updatePostDto, req.user, postId);
  }

  @Delete('/:postId')
  deletePost(@Req() req: ExtendedRequest, @Param('postId') postId: string) {
    return this.postsService.deletePost(req.user, postId);
  }
}
