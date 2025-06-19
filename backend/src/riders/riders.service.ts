import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from './entities/rider.entity';
import { Repository } from 'typeorm';
import { CreateRiderInput } from './dto/create-rider.input';
import { UpdateRiderInput } from './dto/update-rider.input';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepo: Repository<Rider>,
  ) {}

  create(data: CreateRiderInput) {
    return this.riderRepo.save(data);
  }

  findAll() {
    return this.riderRepo.find({ relations: ['zone'] });
  }

  findOne(id: string) {
    return this.riderRepo.findOne({ where: { id }, relations: ['zone'] });
  }

  update(id: string, data: UpdateRiderInput) {
    return this.riderRepo.save({ ...data, id });
  }

  remove(id: string) {
    return this.riderRepo.delete(id);
  }
}
