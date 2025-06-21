import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FoodCategory } from './entities/food-category.entity';
import { FoodCategoryService } from './food-category.service';
import { UpdateFoodCategoryInput } from './dto/update-food-category.input';
import { CreateFoodCategoryInput } from './dto/create-food-category.input';

@Resolver(() => FoodCategory)
export class FoodCategoryResolver {
  constructor(private readonly categoryService: FoodCategoryService) {}

  @Mutation(() => FoodCategory)
  createFoodCategory(
    @Args('createFoodCategoryInput') input: CreateFoodCategoryInput,
  ) {
    return this.categoryService.create(input);
  }

  @Query(() => [FoodCategory])
  foodCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => FoodCategory)
  foodCategory(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => FoodCategory)
  updateFoodCategory(
    @Args('updateFoodCategoryInput') input: UpdateFoodCategoryInput,
  ) {
    return this.categoryService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeFoodCategory(@Args('id') id: string) {
    return this.categoryService.remove(id);
  }
}
