import { Module } from '@nestjs/common';
import { RidersService } from './riders.service';
import { RidersResolver } from './riders.resolver';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rider])],
  providers: [RidersService, RidersResolver],
  exports: [RidersService],
})
export class RidersModule {}
