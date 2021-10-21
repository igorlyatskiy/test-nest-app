import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './models/users.entity';
import loggerFunc from './common/logger';
import { UsersModule } from './users/users.module';
import config from './config';

const logger = loggerFunc('app');

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: config.db.dialect as any,
      host: config.db.host,
      port: +config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      entities: [User],
      synchronize: config.db.synchronize,
      logging: true,
      logger: logger.TRACE,
    }),
    UsersModule,
  ],
})
export class AppModule {}
