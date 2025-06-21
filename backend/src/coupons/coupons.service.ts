import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  create(data: CreateCouponInput) {
    return this.couponRepo.save(data);
  }

  findAll() {
    return this.couponRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.couponRepo.findOne({ where: { id } });
  }

  update(id: string, data: UpdateCouponInput) {
    return this.couponRepo.save({ ...data, id });
  }

  async remove(id: string) {
    await this.couponRepo.delete(id);
    return true;
  }
}
