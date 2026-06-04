import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';

import type { Request, Express } from 'express';

import {
  ApiBearerAuth,
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

import { BookingService } from './booking.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// DTO IMPORT
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ScanQrDto } from './dto/scan-qr.dto';

@ApiTags('Booking')
@ApiBearerAuth('access-token')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  createBooking(@Body() body: CreateBookingDto, @Req() req: Request) {
    return this.bookingService.create({
      ...body,
      userId: (req as any).user.sub,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyBookings(@Req() req: Request) {
    return this.bookingService.findByUser((req as any).user.sub);
  }

  // 🔥 RIWAYAT PENDAKIAN USER
  @Get('history')
  @UseGuards(JwtAuthGuard)
  getHistory(@Req() req: Request) {
    return this.bookingService.getHistory((req as any).user.sub);
  }

  // 🔥 DASHBOARD USER
  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  getDashboard(@Req() req: Request) {
    return this.bookingService.getUserDashboard((req as any).user.sub);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getStats() {
    return this.bookingService.getStats();
  }

  // 🔥 PAGINATION + FILTER + SEARCH
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'PENDING',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'subayu',
  })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getBookings(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.bookingService.findAll(
      Number(page),
      Number(limit),
      status,
      search,
    );
  }

  // 🔥 CEK SISA KUOTA TANGGAL PENDAKIAN
  @ApiQuery({
    name: 'date',
    required: true,
    example: '2026-06-10',
  })
  @Get('quota')
  @UseGuards(JwtAuthGuard)
  getQuota(@Query('date') date: string) {
    return this.bookingService.getQuota(date);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getBookingById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  // 🔥 UPLOAD BUKTI PEMBAYARAN
  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadPaymentProof(
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.bookingService.uploadProof(Number(id), file.filename);
  }

  // 🔥 SCAN QR
  @Post('scan')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  scanQr(@Body() body: ScanQrDto) {
    return this.bookingService.scanQr(body.bookingId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    return this.bookingService.updateStatus(Number(id), body.status);
  }
}
