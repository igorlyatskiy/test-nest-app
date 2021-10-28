import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExtendedRequest } from './interfaces/extended-request.interface';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') userId) {
    return this.usersService.getUser(null, userId);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') userId,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExtendedRequest,
  ) {
    return this.usersService.updateUser(userId, updateUserDto, req.user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId, @Body() deleteUserDto: DeleteUserDto) {
    return;
  }
}
