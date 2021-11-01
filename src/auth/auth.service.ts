import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PublicUserAuthData } from '../users/interfaces/public-user-auth-data';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(createUserDTO: CreateUserDto): Promise<PublicUserAuthData> {
    const userData = await this.usersRepository.createUser(createUserDTO);
    const publicUserData = {
      userId: userData.userId,
      email: userData.email,
    };
    await this.mailService.sendVerificationEmail(
      userData.email,
      userData.userId,
      userData.activationCode,
    );

    return publicUserData;
  }

  async logIn(authCredentialsDto: LoginUserDto): Promise<PublicUserAuthData> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const userStatus = user && (await bcrypt.compare(password, user.password));

    if (userStatus) {
      const payload: JwtPayload = { userId: user.userId };
      const token = this.jwtService.sign(payload);

      return {
        email,
        userId: user.userId,
        token: token,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
