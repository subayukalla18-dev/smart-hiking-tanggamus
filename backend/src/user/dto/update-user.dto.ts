import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({
        example: 'Bayu',
    })
    @IsOptional()
    @IsString({
        message: 'Nama harus berupa teks',
    })
    name?: string;

    @ApiPropertyOptional({
        example: 'bayu@gmail.com',
    })
    @IsOptional()
    @IsEmail(
        {},
        {
            message: 'Email tidak valid',
        },
    )
    email?: string;

    @ApiPropertyOptional({
        example: '123456',
    })
    @IsOptional()
    @IsString({
        message: 'Password harus berupa teks',
    })
    @MinLength(6, {
        message: 'Password minimal 6 karakter',
    })
    password?: string;
}
