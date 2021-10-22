import { EntityRepository, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find({
      relations: ['posts'],
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({
      relations: ['posts'],
      where: { email },
    });
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.findOne({
      relations: ['posts'],
      where: { userId: id },
    });
  }

  async createUser(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDTO;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const isUserAlreadyCreated = await this.findOne({
      where: { email },
    });

    if (isUserAlreadyCreated) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = new UserEntity();
    user.email = email;
    user.password = encryptedPassword;
    user.activated = false;
    await this.save(user);
    return user;
  }
}
