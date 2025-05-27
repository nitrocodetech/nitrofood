import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend URL
  app.enableCors({
    origin: '*', // allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // enable cookies and auth headers if needed
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`\n🚀 NitroFood started on port ${process.env.PORT ?? 8080}`);
  console.log('✅ Database connected successfully!');
}
bootstrap();
