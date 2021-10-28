import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    if (userId !== user.userId) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.updateUser(updateUserDto);
  }
}
