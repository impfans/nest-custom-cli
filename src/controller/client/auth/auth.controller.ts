import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '~service';
import { UserDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: UserDto): Promise<any> {
    return body;
  }
}
