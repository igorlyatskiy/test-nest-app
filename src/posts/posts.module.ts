import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
