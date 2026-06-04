import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class UpdateProfileDto {
    @ApiPropertyOptional({
        example: 'Subayu',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: 'subayu@gmail.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        example: '123456',
    })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}