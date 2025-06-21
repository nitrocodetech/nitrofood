import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { Variation } from './entities/variation.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepo: Repository<Food>,

    @InjectRepository(Variation)
    private readonly variationRepo: Repository<Variation>,
  ) {}

  async create(data: CreateFoodInput) {
    const food = this.foodRepo.create({
      ...data,
      variations:
        data.variations?.map((v) => this.variationRepo.create({ ...v })) || [],
    });

    return this.foodRepo.save(food);
  }

  findAll() {
    return this.foodRepo.find(); // eager relations auto-included
  }

  findOne(id: string) {
    return this.foodRepo.findOne({ where: { id } }); // eager relations auto-included
  }

  async update(id: string, data: UpdateFoodInput) {
    const existing = await this.foodRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Food not found');

    // Replace variations if provided
    if (data.variations) {
      await this.variationRepo.delete({ food: { id } });
      existing.variations = data.variations.map((v) =>
        this.variationRepo.create({ ...v, food: existing }),
      );
    }

    const updated = this.foodRepo.merge(existing, data);
    return this.foodRepo.save(updated);
  }

  async remove(id: string) {
    const food = await this.foodRepo.findOne({ where: { id } });
    if (!food) throw new NotFoundException('Food not found');
    await this.foodRepo.delete(id);
    return true;
  }
}
