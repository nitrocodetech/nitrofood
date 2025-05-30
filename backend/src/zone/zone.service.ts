import { Injectable } from '@nestjs/common';
import { UpdateZoneInput } from './dto/update-zone.input';
import { CreateZoneInput } from './dto/create-zone.input';
import { Zone } from './entities/zone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
  ) {}

  create(data: CreateZoneInput) {
    return this.zoneRepo.save(data);
  }

  findAll() {
    return this.zoneRepo.find();
  }

  findOne(id: string) {
    return this.zoneRepo.findOne({ where: { id } });
  }

  update(id: string, data: UpdateZoneInput) {
    return this.zoneRepo.save({ ...data, id });
  }

  remove(id: string) {
    return this.zoneRepo.delete(id);
  }
}
