import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Zone } from 'src/zone/entities/zone.entity';

@Global() // <-- This makes the module global
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [User, Zone],
        synchronize: true, // ✅ this pushes entity changes to DB automatically
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
