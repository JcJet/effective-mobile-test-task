import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  await app.init();

  await app.listen(process.env.PORT, () => {
    console.log(`Users ms started on ${process.env.PORT} at ${new Date()}.`);
    console.log('Application variables:');
    console.log('RabbitMQ address:', process.env.RMQ_URL);
  });
}
bootstrap();
