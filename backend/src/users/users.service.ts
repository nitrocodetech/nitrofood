import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
