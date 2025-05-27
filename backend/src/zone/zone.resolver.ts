import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ZoneService } from './zone.service';
import { Zone } from './entities/zone.entity';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';

@Resolver(() => Zone)
export class ZoneResolver {
  constructor(private readonly zoneService: ZoneService) {}

  @Mutation(() => Zone)
  createZone(@Args('createZoneInput') createZoneInput: CreateZoneInput) {
    return this.zoneService.create(createZoneInput);
  }

  @Query(() => [Zone])
  zones() {
    return this.zoneService.findAll();
  }

  @Query(() => Zone)
  zone(@Args('id', { type: () => String }) id: string) {
    return this.zoneService.findOne(id);
  }

  @Mutation(() => Zone)
  updateZone(@Args('updateZoneInput') updateZoneInput: UpdateZoneInput) {
    return this.zoneService.update(updateZoneInput.id, updateZoneInput);
  }

  @Mutation(() => Zone)
  removeZone(@Args('id', { type: () => String }) id: string) {
    return this.zoneService.remove(id);
  }
}
