import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

import configuration from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
