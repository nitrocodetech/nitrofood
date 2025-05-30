import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { UpdateZoneInput } from './dto/update-zone.input';
import { CreateZoneInput } from './dto/create-zone.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ZoneService {
  constructor(private prisma: PrismaService) {}

  create(createZoneInput: CreateZoneInput) {
    const { title, description } = createZoneInput;

    return this.prisma.zone.create({
      data: {
        title,
        description,
        polygon: createZoneInput.polygon as Prisma.InputJsonValue,
      },
    });
  }

  findAll() {
    return this.prisma.zone.findMany({});
  }

  findOne(id: string) {
    return this.prisma.zone.findUnique({
      where: { id },
    });
  }

  update(id: string, updateZoneInput: UpdateZoneInput) {
    return this.prisma.zone.update({
      where: { id },
      data: updateZoneInput,
    });
  }

  remove(id: string) {
    return this.prisma.zone.delete({ where: { id } });
  }
}
