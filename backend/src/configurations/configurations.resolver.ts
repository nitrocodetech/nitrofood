import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConfigurationsService } from './configurations.service';
import { Configuration } from './entities/configuration.entity';
import { CreateConfigurationInput } from './dto/create-configuration.input';
import { UpdateConfigurationInput } from './dto/update-configuration.input';

@Resolver(() => Configuration)
export class ConfigurationsResolver {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Mutation(() => Configuration)
  createConfiguration(@Args('createConfigurationInput') createConfigurationInput: CreateConfigurationInput) {
    return this.configurationsService.create(createConfigurationInput);
  }

  @Query(() => [Configuration], { name: 'configurations' })
  findAll() {
    return this.configurationsService.findAll();
  }

  @Query(() => Configuration, { name: 'configuration' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.configurationsService.findOne(id);
  }

  @Mutation(() => Configuration)
  updateConfiguration(@Args('updateConfigurationInput') updateConfigurationInput: UpdateConfigurationInput) {
    return this.configurationsService.update(updateConfigurationInput.id, updateConfigurationInput);
  }

  @Mutation(() => Configuration)
  removeConfiguration(@Args('id', { type: () => Int }) id: number) {
    return this.configurationsService.remove(id);
  }
}
