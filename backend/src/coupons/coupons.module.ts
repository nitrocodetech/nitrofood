import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponsService } from './coupons.service';
import { CouponsResolver } from './coupons.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponsService, CouponsResolver],
  exports: [CouponsService],
})
export class CouponsModule {}
