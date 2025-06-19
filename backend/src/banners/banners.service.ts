import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,
  ) {}

  create(data: CreateBannerInput) {
    return this.bannerRepo.save(data);
  }

  findAll() {
    return this.bannerRepo.find({
      order: { position: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.bannerRepo.findOne({ where: { id } });
  }

  update(id: string, data: UpdateBannerInput) {
    return this.bannerRepo.save({ ...data, id });
  }

  remove(id: string) {
    return this.bannerRepo.delete(id);
  }
}
