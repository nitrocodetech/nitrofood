import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Cuisine } from 'src/cuisine/entities/cuisine.entity';
import { Rider } from 'src/riders/entities/rider.entity';
import { Banner } from 'src/banners/entities/banner.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [User, Zone, Restaurant, Cuisine, Rider, Banner],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
