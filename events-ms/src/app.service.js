import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventRecord } from './eventRecord.entity';


@Injectable()
@Dependencies(getRepositoryToken(EventRecord))
export class EventsService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async addEvent(dto) {
    return await this.eventsRepository.insert(dto);
  }
  async getEvents(body) {
    const [result, total] = await this.eventsRepository.findAndCount({
      where: { userId: body.userId },
      take: body.take || 10,
      skip: body.skip || 0,
    });

    return {
      data: result,
      count: total,
    };
  }
}
