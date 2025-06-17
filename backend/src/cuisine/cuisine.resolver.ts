import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cuisine } from './entities/cuisine.entity';
import { CreateCuisineInput } from './dto/create-cuisine.input';
import { UpdateCuisineInput } from './dto/update-cuisine.input';
import { CuisineService } from './cuisine.service';

@Resolver(() => Cuisine)
export class CuisineResolver {
  constructor(private readonly cuisinesService: CuisineService) {}

  @Mutation(() => Cuisine)
  createCuisine(
    @Args('createCuisineInput') createCuisineInput: CreateCuisineInput,
  ) {
    return this.cuisinesService.create(createCuisineInput);
  }

  @Query(() => [Cuisine], { name: 'cuisines' })
  findAll() {
    return this.cuisinesService.findAll();
  }

  @Query(() => Cuisine, { name: 'cuisine' })
  findOne(@Args('id') id: string) {
    return this.cuisinesService.findOne(id);
  }

  @Mutation(() => Cuisine)
  updateCuisine(
    @Args('updateCuisineInput') updateCuisineInput: UpdateCuisineInput,
  ) {
    return this.cuisinesService.update(
      updateCuisineInput.id,
      updateCuisineInput,
    );
  }

  @Mutation(() => Boolean)
  removeCuisine(@Args('id') id: string) {
    return this.cuisinesService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }
}
