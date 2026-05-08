import 'reflect-metadata';
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 🔥 IMPORT INTERCEPTOR
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// 🔥 IMPORT FILTER
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔥 CORS FIX
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // 🔥 VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {}),
        );

        throw new BadRequestException(messages);
      },
    }),
  );

  // 🔥 RESPONSE FORMATTER
  app.useGlobalInterceptors(new TransformInterceptor());

  // 🔥 GLOBAL ERROR HANDLER
  app.useGlobalFilters(new HttpExceptionFilter());

  // 🔥 STATIC FILE
  app.useStaticAssets('uploads');

  // 🔥 SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Smart Hiking API')
    .setDescription('API Smart Hiking Tanggamus')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
