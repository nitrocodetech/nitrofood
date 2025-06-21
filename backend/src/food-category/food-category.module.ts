import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategory } from './entities/food-category.entity';
import { FoodCategoryService } from './food-category.service';
import { FoodCategoryResolver } from './food-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategory])],
  providers: [FoodCategoryService, FoodCategoryResolver],
  exports: [FoodCategoryService],
})
export class FoodCategoryModule {}
