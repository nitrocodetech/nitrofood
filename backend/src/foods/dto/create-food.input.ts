import { InputType, Field, Float } from '@nestjs/graphql';
import { CreateVariationInput } from './create-variation.input';

@InputType()
class RestaurantRefInput {
  @Field()
  id: string;
}

@InputType()
class CategoryRefInput {
  @Field()
  id: string;
}

@InputType()
class AddonRefInput {
  @Field()
  id: string;
}

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  photo?: string;

  @Field()
  isAvailable: boolean;

  @Field(() => RestaurantRefInput)
  restaurant: RestaurantRefInput;

  @Field(() => CategoryRefInput)
  category: CategoryRefInput;

  @Field(() => [AddonRefInput], { nullable: true })
  addons?: AddonRefInput[];

  @Field(() => [CreateVariationInput])
  variations: CreateVariationInput[];
}
