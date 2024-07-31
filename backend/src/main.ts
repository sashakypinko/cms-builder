import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import unprocessableEntityExceptionFactory from './common/factories/unprocessable-entity-exception.factory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: unprocessableEntityExceptionFactory,
    }),
  );
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} description`)
    .setVersion(process.env.APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}

bootstrap();
