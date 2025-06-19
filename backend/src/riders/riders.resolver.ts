import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RidersService } from './riders.service';
import { Rider } from './entities/rider.entity';
import { CreateRiderInput } from './dto/create-rider.input';
import { UpdateRiderInput } from './dto/update-rider.input';

@Resolver(() => Rider)
export class RidersResolver {
  constructor(private readonly ridersService: RidersService) {}

  @Mutation(() => Rider)
  createRider(@Args('createRiderInput') createRiderInput: CreateRiderInput) {
    return this.ridersService.create(createRiderInput);
  }

  @Query(() => [Rider], { name: 'riders' })
  findAll() {
    return this.ridersService.findAll();
  }

  @Query(() => Rider, { name: 'rider' })
  findOne(@Args('id') id: string) {
    return this.ridersService.findOne(id);
  }

  @Mutation(() => Rider)
  updateRider(@Args('updateRiderInput') updateRiderInput: UpdateRiderInput) {
    return this.ridersService.update(updateRiderInput.id, updateRiderInput);
  }

  @Mutation(() => Boolean)
  async removeRider(@Args('id') id: string) {
    await this.ridersService.remove(id);
    return true;
  }
}
