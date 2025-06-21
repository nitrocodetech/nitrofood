import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addon } from './entities/addon.entity';
import { CreateAddonInput } from './dto/create-addon.input';
import { UpdateAddonInput } from './dto/update-addon.input';

@Injectable()
export class AddonsService {
  constructor(
    @InjectRepository(Addon)
    private readonly addonRepo: Repository<Addon>,
  ) {}

  async create(data: CreateAddonInput) {
    const addon = this.addonRepo.create(data);
    return this.addonRepo.save(addon);
  }

  async findAll() {
    return this.addonRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const addon = await this.addonRepo.findOne({ where: { id } });

    if (!addon) {
      throw new NotFoundException('Addon not found');
    }

    return addon;
  }

  async update(id: string, data: UpdateAddonInput) {
    const existing = await this.addonRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Addon not found');
    }

    const updated = this.addonRepo.merge(existing, data);
    return this.addonRepo.save(updated);
  }

  async remove(id: string) {
    const addon = await this.addonRepo.findOne({ where: { id } });
    if (!addon) {
      throw new NotFoundException('Addon not found');
    }

    await this.addonRepo.remove(addon);
    return true;
  }
}
