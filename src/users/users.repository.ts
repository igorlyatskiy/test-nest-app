import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addUser(createUserDTO: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDTO;
      const user = new User();
      user.email = email;
      user.password = password;
      await this.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
