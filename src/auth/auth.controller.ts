import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { RefreshTokenGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  localSignup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.localSignup(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  localSignin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.localSignin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
