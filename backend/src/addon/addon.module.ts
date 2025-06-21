import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addon } from './entities/addon.entity';
import { AddonsService } from './addon.service';
import { AddonsResolver } from './addon.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Addon])],
  providers: [AddonsService, AddonsResolver],
  exports: [AddonsService],
})
export class AddonsModule {}
