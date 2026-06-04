import 'reflect-metadata';
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import cors from 'cors';
import { join } from 'path';

// 🔥 IMPORT INTERCEPTOR
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// 🔥 IMPORT FILTER
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔥 EXPRESS CORS FIX
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: '*',
    }),
  );

  // 🔥 HANDLE PREFLIGHT
  app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );

    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
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
  app.useStaticAssets(join(process.cwd(), 'uploads'));

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

  await app.listen(3001);

  console.log(`🚀 Server running on http://localhost:3001`);
}

bootstrap();
