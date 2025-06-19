import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionRate } from './entities/commission-rate.entity';
import { CreateCommissionRateInput } from './dto/create-commission-rate.input';
import { UpdateCommissionRateInput } from './dto/update-commission-rate.input';

@Injectable()
export class CommissionRateService {
  constructor(
    @InjectRepository(CommissionRate)
    private commissionRateRepo: Repository<CommissionRate>,
  ) {}

  create(input: CreateCommissionRateInput) {
    const commissionRate = this.commissionRateRepo.create(input);
    return this.commissionRateRepo.save(commissionRate);
  }

  findAll() {
    return this.commissionRateRepo.find();
  }

  findOne(id: string) {
    return this.commissionRateRepo.findOne({ where: { id } });
  }

  update(id: string, input: UpdateCommissionRateInput) {
    return this.commissionRateRepo.save({ ...input, id });
  }

  remove(id: string) {
    return this.commissionRateRepo.delete(id);
  }

  findByVendorId(restaurantId: string) {
    return this.commissionRateRepo.findOne({ where: { restaurantId } });
  }
}
