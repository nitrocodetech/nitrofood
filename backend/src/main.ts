import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8080);
  console.log(`\n🚀 NitroFood started on port ${process.env.PORT ?? 8080}`);
  console.log('✅ Database connected successfully!');
}
bootstrap();
