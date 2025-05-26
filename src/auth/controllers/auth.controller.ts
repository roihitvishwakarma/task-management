import { Controller, Post, Request, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOkResponse({ description: 'User logged in successfully', schema: {
    example: {
      access_token: 'jwt_token_here',
      refresh_token: 'jwt_refresh_token_here',
      user: {
        id: 1,
        username: 'john_doe'
      }
    }
  } })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginAuthDto: LoginAuthDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: CreateAuthDto })
  @ApiCreatedResponse({ description: 'User registered successfully', schema: {
    example: {
      id: 1,
      username: 'john_doe'
    }
  } })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('refresh')
  @ApiBody({ schema: {
    example: {
      userId: "YGVUYVIUOHPI",
      refreshToken: 'jwt_refresh_token_here'
    }
  } })
  @ApiOkResponse({ description: 'New access token issued', schema: {
    example: {
      access_token: 'new_jwt_access_token_here'
    }
  } })
  async refresh(@Body('userId') userId: string, @Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body(new ValidationPipe({ whitelist: true })) forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}