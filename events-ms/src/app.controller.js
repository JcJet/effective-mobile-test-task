import { MessagePattern, Payload} from '@nestjs/microservices';
import { Controller, Get, Body, Bind, Dependencies  } from '@nestjs/common';
import { EventsService } from './app.service';

@Controller('events')
@Dependencies(EventsService)
export class EventsController {
  constructor(eventsService) {
    this.eventsService = eventsService;
  }

  @Bind(Payload())
  @MessagePattern('addEvent')
  async addEvent( data ) {
    return await this.eventsService.addEvent(data.dto);
  }

  @Get()
  @Bind(Body())
  async getHistory( body ) {
    return await this.eventsService.getEvents(body);
  }
}
