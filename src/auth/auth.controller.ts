import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { PublicUserAuthData } from '../users/interfaces/public-user-auth-data';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: CreateUserDto,
  ): Promise<PublicUserAuthData> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  logIn(@Body() authCredentialsDto: LoginUserDto): Promise<PublicUserAuthData> {
    return this.authService.logIn(authCredentialsDto);
  }
}
