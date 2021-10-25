import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    return await this.find({
      relations: ['posts'],
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({
      relations: ['posts'],
      where: { email },
    });
  }

  async getUserById(id: string): Promise<User> {
    return await this.findOne({
      relations: ['posts'],
      where: { userId: id },
    });
  }

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const { email, password } = createUserDTO;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const isUserAlreadyCreated = await this.findOne({
      where: { email },
    });

    if (isUserAlreadyCreated) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = new User();
    user.email = email;
    user.password = encryptedPassword;
    user.activated = false;
    await this.save(user);
    return user;
  }
}
