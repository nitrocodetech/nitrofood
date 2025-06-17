import { Module } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CuisineResolver } from './cuisine.resolver';
import { Cuisine } from './entities/cuisine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cuisine])],
  providers: [CuisineService, CuisineResolver],
  exports: [CuisineService],
})
export class CuisineModule {}
