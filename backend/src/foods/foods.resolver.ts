import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Resolver(() => Food)
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Mutation(() => Food)
  createFood(@Args('createFoodInput') input: CreateFoodInput) {
    return this.foodsService.create(input);
  }

  @Query(() => [Food])
  foods() {
    return this.foodsService.findAll();
  }

  @Query(() => Food)
  food(@Args('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Mutation(() => Food)
  updateFood(@Args('updateFoodInput') input: UpdateFoodInput) {
    return this.foodsService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeFood(@Args('id') id: string) {
    return this.foodsService.remove(id);
  }
}
