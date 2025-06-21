import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateFoodCategoryInput } from './create-food-category.input';

@InputType()
export class UpdateFoodCategoryInput extends PartialType(
  CreateFoodCategoryInput,
) {
  @Field()
  id: string;
}
