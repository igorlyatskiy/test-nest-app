import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private UserRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.UserRepository.getAllUsers();
  }

  async addUser(createUserDTO: CreateUserDto): Promise<User> {
    return this.UserRepository.addUser(createUserDTO);
  }
}
