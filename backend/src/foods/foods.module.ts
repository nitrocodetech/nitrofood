import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { Variation } from './entities/variation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Variation])],
  providers: [FoodsService, FoodsResolver],
  exports: [FoodsService],
})
export class FoodsModule {}
