import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Suhek',
  })
  @IsString({
    message: 'Nama harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Nama wajib diisi',
  })
  name!: string;

  @ApiProperty({
    example: 'suhek@gmail.com',
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
  @MinLength(6, {
    message: 'Password minimal 6 karakter',
  })
  password!: string;
}
