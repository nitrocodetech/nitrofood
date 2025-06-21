import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodCategory } from './entities/food-category.entity';
import { CreateFoodCategoryInput } from './dto/create-food-category.input';
import { UpdateFoodCategoryInput } from './dto/update-food-category.input';

@Injectable()
export class FoodCategoryService {
  constructor(
    @InjectRepository(FoodCategory)
    private readonly categoryRepo: Repository<FoodCategory>,
  ) {}

  create(data: CreateFoodCategoryInput) {
    return this.categoryRepo.save(data);
  }

  findAll() {
    return this.categoryRepo.find({ relations: ['items'] });
  }

  findOne(id: string) {
    return this.categoryRepo.findOne({ where: { id }, relations: ['items'] });
  }

  update(id: string, data: UpdateFoodCategoryInput) {
    return this.categoryRepo.save({ ...data, id });
  }

  async remove(id: string) {
    await this.categoryRepo.delete(id);
    return true;
  }
}
