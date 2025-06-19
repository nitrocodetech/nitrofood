import { Module } from '@nestjs/common';
import { CommissionRateService } from './commission-rate.service';
import { CommissionRateResolver } from './commission-rate.resolver';
import { CommissionRate } from './entities/commission-rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommissionRate])],
  providers: [CommissionRateService, CommissionRateResolver],
  exports: [CommissionRateService],
})
export class RestaurantsModule {}
export class CommissionRateModule {}
