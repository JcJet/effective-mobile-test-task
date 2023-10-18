import { Module } from '@nestjs/common';
import { EventsService } from './app.service';
import { EventsController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventRecord } from './eventRecord.entity';

@Module({
  providers: [EventsService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [EventRecord],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EventRecord]),
  ],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
