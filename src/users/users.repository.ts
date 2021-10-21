import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.find({
        relations: ['posts'],
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addUser(createUserDTO: CreateUserDto): Promise<UserEntity> {
    try {
      const { email, password } = createUserDTO;
      const user = new UserEntity();
      user.email = email;
      user.password = password;
      user.activated = false;
      await this.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
