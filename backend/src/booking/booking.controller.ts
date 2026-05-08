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

  // 🔥 UPLOAD BUKTI PEMBAYARAN
  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
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
