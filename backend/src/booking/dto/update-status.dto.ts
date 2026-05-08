import { ApiProperty } from '@nestjs/swagger';

import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'ON_HIKE', 'FINISHED'],
    example: 'APPROVED',
  })
  @IsNotEmpty({
    message: 'Status wajib diisi',
  })
  @IsIn(['PENDING', 'APPROVED', 'REJECTED', 'ON_HIKE', 'FINISHED'], {
    message: 'Status tidak valid',
  })
  status!: string;
}
