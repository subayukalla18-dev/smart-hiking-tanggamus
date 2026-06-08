import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';

import type { Request } from 'express';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

// DTO IMPORT
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return (req as any).user;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: Request, @Body() body: UpdateProfileDto) {
    return this.authService.updateProfile((req as any).user.sub, body);
  }
}
