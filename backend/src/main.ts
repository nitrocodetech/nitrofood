import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend URL
  app.enableCors({
    origin: 'http://localhost:3001', // adjust if you add more origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`\n🚀 NitroFood started on port ${process.env.PORT ?? 8080}`);
  console.log('✅ Database connected successfully!');
}
bootstrap();
