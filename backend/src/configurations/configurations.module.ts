import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsResolver } from './configurations.resolver';

@Module({
  providers: [ConfigurationsResolver, ConfigurationsService],
})
export class ConfigurationsModule {}
