import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfigFactory = (): TypeOrmModuleOptions => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  type: 'postgres',
  synchronize: !!process.env.DB_SYNC,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
