import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }

  async getUser(email: string, id?: string): Promise<User> {
    if (email) {
      return this.usersRepository.getUserByEmail(email);
    }

    if (id) {
      return this.usersRepository.getUserById(id);
    }

    return null;
  }
}
