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
import { PublicUserData } from '../users/interfaces/public-user-data.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDTO: CreateUserDto): Promise<PublicUserData> {
    const userData = await this.usersRepository.createUser(createUserDTO);
    const publicUserData = {
      userId: userData.userId,
      email: userData.email,
    };
    return publicUserData;
  }

  async logIn(authCredentialsDto: LoginUserDto): Promise<PublicUserData> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const userStatus = user && (await bcrypt.compare(password, user.password));

    if (userStatus) {
      const payload = { userId: user.userId };
      const token = this.jwtService.sign(payload);

      return {
        email,
        userId: user.userId,
        token: 'token',
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
