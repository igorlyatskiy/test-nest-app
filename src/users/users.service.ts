import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_REPOSITORY } from '../constants';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  addUser(createUserDto: CreateUserDto): UserModel {
    const { email, password } = createUserDto;
    const user = { email, password, status: true };
    return user;
  }
}
