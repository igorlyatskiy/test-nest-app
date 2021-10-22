import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.getAllUsers();
  }

  async getUser(email: string, id?: string): Promise<UserEntity> {
    if (email) {
      return this.usersRepository.getUserByEmail(email);
    }

    if (id) {
      return this.usersRepository.getUserById(id);
    }

    return null;
  }
}
