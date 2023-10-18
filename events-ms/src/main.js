import { NestFactory } from '@nestjs/core';
import { EventsModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: 'toEventsMs',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices().then(() => {
    console.log('History MS started.');
  });

  await app.listen(process.env.PORT, () => {
    console.log(
      `History MS listening on ${process.env.PORT} at ${new Date()}.`,
    );
  });
}
bootstrap();
