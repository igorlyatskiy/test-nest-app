import { EntityRepository, Repository } from 'typeorm';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

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
        relations: ['posts', 'posts.comments'],
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
        relations: ['posts', 'posts.comments'],
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
        relations: ['posts', 'posts.comments'],
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
      const activationCode = randomBytes(32).toString('hex');
      user.email = email;
      user.password = encryptedPassword;
      user.activated = false;
      user.activationCode = activationCode;
      await this.save(user);
      return user;
    } catch (error) {
      this.logger.error('Unhandled error at createUser method', error);
      throw new InternalServerErrorException();
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User) {
    this.logger.log('Updating the user');

    try {
      await this.save({
        userId: user.userId,
        phone: updateUserDto.phone,
        nickname: updateUserDto.nickname,
      });
      return await this.getUserById(user.userId);
    } catch (error) {
      this.logger.error('Unhandled error at updateUser method', error);
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(userId: string) {
    try {
      this.logger.log('Deleting the user');

      await this.delete({ userId });
    } catch (error) {
      this.logger.error('Unhandled error at deleteUser method', error);
      throw new InternalServerErrorException();
    }
  }

  async activateUser(userId: string, activationCode: string) {
    try {
      this.logger.log('Activating the user');

      const user = await this.findOne({ where: { userId } });
      if (!user) {
        throw new NotFoundException();
      }

      if (user.activationCode !== activationCode) {
        throw new ForbiddenException();
      }

      return await this.save({
        userId,
        activated: true,
      });
    } catch (error) {
      this.logger.error('Unhandled error at activateUser method', error);
      throw new InternalServerErrorException();
    }
  }
}
