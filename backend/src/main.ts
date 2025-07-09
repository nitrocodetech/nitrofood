import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/webhook/stripe', express.raw({ type: 'application/json' }));

  // Enable CORS for your frontend URL
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // strips properties not in DTO
      // forbidNonWhitelisted: true, // throws error on unknown props
      transform: true, // auto-transform payloads to DTO classes
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();

        return new BadRequestException({
          message: messages.join(', '),
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8080);
  console.log(`\n🚀 NitroFood started on port ${process.env.PORT ?? 8080}`);
  console.log('✅ Database connected successfully!');
}
bootstrap();
