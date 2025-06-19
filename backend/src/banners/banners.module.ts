import { Module } from '@nestjs/common';
import { BannerService } from './banners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannerResolver } from './banners.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerService, BannerResolver],
  exports: [BannerService],
})
export class BannersModule {}
