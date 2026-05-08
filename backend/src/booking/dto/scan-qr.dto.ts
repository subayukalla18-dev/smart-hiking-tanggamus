import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

export class ScanQrDto {
  @ApiProperty({
    example: 5,
  })
  @IsInt({
    message: 'Booking ID harus berupa angka',
  })
  bookingId!: number;
}
