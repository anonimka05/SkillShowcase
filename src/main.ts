import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionHandlerFilter } from './filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsg = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsg.join(' && '));
      },
    }),
  );

  app.useGlobalFilters(new ExceptionHandlerFilter());

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('SkilShowcase API')
    .setDescription('The SkillShowcase API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
