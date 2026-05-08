import { ApiProperty } from '@nestjs/swagger';

import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '2026-05-10',
  })
  @IsDateString(
    {},
    {
      message: 'Tanggal pendakian tidak valid',
    },
  )
  hikingDate!: string;

  @ApiProperty({
    example: 3,
  })
  @IsInt({
    message: 'Total pendaki harus berupa angka',
  })
  @Min(1, {
    message: 'Minimal 1 pendaki',
  })
  @Max(5, {
    message: 'Maksimal 5 pendaki',
  })
  totalPerson!: number;

  @ApiProperty({
    example: '1234567890123456',
  })
  @IsString({
    message: 'NIK harus berupa teks',
  })
  @IsNotEmpty({
    message: 'NIK wajib diisi',
  })
  nik!: string;

  @ApiProperty({
    example: '08123456789',
  })
  @IsString({
    message: 'Nomor telepon harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Nomor telepon wajib diisi',
  })
  phone!: string;

  @ApiProperty({
    example: 'Tanggamus',
  })
  @IsString({
    message: 'Alamat harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Alamat wajib diisi',
  })
  address!: string;

  @ApiProperty({
    example: '08111111111',
  })
  @IsString({
    message: 'Kontak darurat harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Kontak darurat wajib diisi',
  })
  emergencyContact!: string;
}
