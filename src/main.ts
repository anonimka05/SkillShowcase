import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix('/api/v1');

  // USE MORGAN IN DEVELOPMENT MODE
  if (process.env.NODE_ENV == 'development') {
    app.use(morgan('tiny'));
  }
  const port = configService.get<number>('appConfig.port');
  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
bootstrap();
