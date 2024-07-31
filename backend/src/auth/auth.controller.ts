import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { RefreshTokenGuard } from './refresh-token.guard';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { WithoutAuth } from './decorators/without-auth.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthUser } from './decorators/auth-user.decorator';
import { ApplyResetPasswordCodeRequestDto } from './dto/apply-reset-password-code-request.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ApplyResetPasswordCodeResponseDto } from './dto/apply-reset-password-code-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({})
  @Get('get-auth-user')
  getAuthUser(@AuthUser() authUser: UserDocument): UserDocument {
    return authUser;
  }

  @ApiResponse({ type: AuthResponseDto })
  @WithoutAuth()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.authService.signUp(createUserDto);
  }

  @ApiResponse({ type: AuthResponseDto })
  @WithoutAuth()
  @Post('signin')
  signin(@Body() data: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.signIn(data);
  }

  @ApiResponse({})
  @ApiHeader({ name: 'Authorization' })
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req['authId']);
  }

  @UseGuards(RefreshTokenGuard)
  @WithoutAuth()
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const authId = req.user['authId'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(authId, refreshToken);
  }

  @ApiResponse({})
  @WithoutAuth()
  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.authService.verify(code);
  }

  @ApiResponse({})
  @WithoutAuth()
  @Post('send-reset-password-code')
  sendResetPasswordCode(@Body('email') email: string) {
    return email;
  }

  @ApiResponse({})
  @WithoutAuth()
  @Post('apply-reset-password-code')
  applyResetPasswordCode(
    @Body() data: ApplyResetPasswordCodeRequestDto,
  ): ApplyResetPasswordCodeResponseDto {
    return { token: 'some-token' };
  }

  @ApiResponse({})
  @WithoutAuth()
  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordRequestDto) {
    return true;
  }
}
