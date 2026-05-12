import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    // 🔥 FIX CORS HEADER
    response.header('Access-Control-Allow-Origin', '*');

    response.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );

    response.header('Access-Control-Allow-Headers', '*');

    // 🔥 DEFAULT
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any = 'Terjadi kesalahan pada server';

    // =========================================
    // 🔥 HTTP EXCEPTION
    // =========================================
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
      }
    }

    // =========================================
    // 🔥 PRISMA ERROR
    // =========================================
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // UNIQUE
      if (exception.code === 'P2002') {
        status = 400;

        message = 'Data sudah digunakan';
      }

      // NOT FOUND
      if (exception.code === 'P2025') {
        status = 404;

        message = 'Data tidak ditemukan';
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      method: request.method,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
