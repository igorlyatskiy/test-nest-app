import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { PostsModule } from '../posts/posts.module';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository, PostsRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PostsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
