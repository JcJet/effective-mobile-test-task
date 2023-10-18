import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDto } from './dto/User.dto';
import { InsertResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: UserDto): Promise<InsertResult> {
    return this.usersService.createUser(dto);
  }

  @Get()
  async getAllusers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Put(':userId')
  async updateProfile(
    @Param('userId') userId: number,
    @Body() dto: UserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.updateUser(userId, dto);
  }
}
