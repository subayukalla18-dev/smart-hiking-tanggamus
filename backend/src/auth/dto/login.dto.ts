import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  @IsEmail(
    {},
    {
      message: 'Email tidak valid',
    },
  )
  email!: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString({
    message: 'Password harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Password wajib diisi',
  })
  password!: string;
}
