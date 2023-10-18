import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { EventDto } from './dto/event.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('toEventsMs') private toEventsProxy: ClientProxy,
  ) {}

  async sendEvent(dto: EventDto) {
    return await lastValueFrom(this.toEventsProxy.send('addEvent', { dto }));
  }

  async createUser(dto: UserDto): Promise<InsertResult> {
    const profileInsertResult = await this.userRepository.insert({
      ...dto,
    });
    if (profileInsertResult.raw[0].id) {
      this.sendEvent({
        userId: profileInsertResult.raw[0]['id'],
        eventType: 'created',
        eventTime: profileInsertResult.raw[0]['createdAt'],
      });
    }
    return profileInsertResult;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: number, dto: UserDto): Promise<UpdateResult> {
    try {
      const profileUpdateResult = await this.userRepository.update(
        { id },
        { ...dto },
      );
      if (profileUpdateResult.affected != 0) {
        this.sendEvent({
          userId: id,
          eventType: 'updated',
          eventTime: new Date(),
        });
      }
      return profileUpdateResult;
    } catch (e) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }
}
