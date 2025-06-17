import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuisine } from './entities/cuisine.entity';
import { CreateCuisineInput } from './dto/create-cuisine.input';
import { UpdateCuisineInput } from './dto/update-cuisine.input';

@Injectable()
export class CuisineService {
  constructor(
    @InjectRepository(Cuisine)
    private cuisineRepo: Repository<Cuisine>,
  ) {}

  create(data: CreateCuisineInput) {
    return this.cuisineRepo.save(data);
  }

  findAll() {
    return this.cuisineRepo.find();
  }

  findOne(id: string) {
    return this.cuisineRepo.findOne({ where: { id } });
  }

  update(id: string, data: UpdateCuisineInput) {
    return this.cuisineRepo.save({ ...data, id });
  }

  remove(id: string) {
    return this.cuisineRepo.delete(id);
  }
}
