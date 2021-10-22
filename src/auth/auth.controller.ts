import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { PublicUserData } from '../users/interfaces/public-user-data.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: CreateUserDto): Promise<PublicUserData> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  logIn(@Body() authCredentialsDto: LoginUserDto): Promise<PublicUserData> {
    return this.authService.logIn(authCredentialsDto);
  }
}
