import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Addon } from './entities/addon.entity';
import { CreateAddonInput } from './dto/create-addon.input';
import { UpdateAddonInput } from './dto/update-addon.input';
import { AddonsService } from './addon.service';

@Resolver(() => Addon)
export class AddonsResolver {
  constructor(private readonly addonsService: AddonsService) {}

  @Mutation(() => Addon)
  createAddon(@Args('createAddonInput') input: CreateAddonInput) {
    return this.addonsService.create(input);
  }

  @Query(() => [Addon])
  addons() {
    return this.addonsService.findAll();
  }

  @Query(() => Addon)
  addon(@Args('id') id: string) {
    return this.addonsService.findOne(id);
  }

  @Mutation(() => Addon)
  updateAddon(@Args('updateAddonInput') input: UpdateAddonInput) {
    return this.addonsService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeAddon(@Args('id') id: string) {
    return this.addonsService.remove(id);
  }
}
