import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { SerializeInterceptor } from '@/shared/interceptors';
import { UserDto } from '../users/dtos';
import { Public } from '@/shared/decorators';

@ApiTags('Authentication')
@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
