import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from './config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.app.port, () =>
    console.log('SERVER IS RUNNING ON PORT', config.app.port),
  );
}
bootstrap();
