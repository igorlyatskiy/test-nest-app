import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserData } from './interfaces/public-user-data';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<PublicUserData[]> {
    const data = await this.usersRepository.getAllUsers();
    return data.map((user) => this.getPublicUserData(user));
  }

  async getUser(email: string, id?: string): Promise<PublicUserData> {
    let user = null;
    if (email) {
      user = await this.usersRepository.getUserByEmail(email);
    }
    if (id) {
      user = await this.usersRepository.getUserById(id);
    }

    if (user) {
      return this.getPublicUserData(user);
    }

    return null;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<PublicUserData> {
    if (userId !== user.userId) {
      throw new UnauthorizedException();
    }
    const updatedUserData = await this.usersRepository.updateUser(
      updateUserDto,
      user,
    );
    return this.getPublicUserData(updatedUserData);
  }

  async deleteUser(userId: string, user: User): Promise<void> {
    if (userId !== user.userId) {
      throw new UnauthorizedException();
    }
    await this.usersRepository.deleteUser(userId);
  }

  getPublicUserData(user: User): PublicUserData {
    return {
      email: user.email,
      nickname: user.nickname,
      userId: user.userId,
      phone: user.phone,
      posts: user.posts,
    };
  }
}
