import { EntityRepository, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');
  async getAllUsers(): Promise<User[]> {
    try {
      this.logger.log('Getting all users');
      return await this.find({
        relations: ['posts'],
      });
    } catch (error) {
      this.logger.error('Unhandled error at getAllUsers method', error);
      throw new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      this.logger.log('Getting user by email');
      return await this.findOne({
        relations: ['posts'],
        where: { email },
      });
    } catch (error) {
      this.logger.error('Unhandled error at getUserByEmail method', error);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      this.logger.log('Getting user by id');
      return await this.findOne({
        relations: ['posts'],
        where: { userId: id },
      });
    } catch (error) {
      this.logger.error('Unhandled error at getUserById method', error);
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const { email, password } = createUserDTO;

    this.logger.log('Creating the user');

    const encryptedPassword = await bcrypt.hash(password, 10);

    const isUserAlreadyCreated = await this.findOne({
      where: { email },
    });

    if (isUserAlreadyCreated) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    try {
      const user = new User();
      user.email = email;
      user.password = encryptedPassword;
      user.activated = false;
      await this.save(user);
      return user;
    } catch (error) {
      this.logger.error('Unhandled error at createUser method', error);
      throw new InternalServerErrorException();
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(updateUserDto.user.userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    this.logger.log('Updating the user');

    try {
      return this.save({
        userId: updateUserDto.user.userId,
        phone: updateUserDto.phone,
        nickname: updateUserDto.nickname,
      });
    } catch (error) {
      this.logger.error('Unhandled error at updateUser method', error);
      throw new InternalServerErrorException();
    }
  }
}
