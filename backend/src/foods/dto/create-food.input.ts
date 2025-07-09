import { InputType, Field } from '@nestjs/graphql';
import { CreateVariationInput } from './create-variation.input';
import { RefInput } from 'src/common/dto/ref.input';

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  photo?: string;

  @Field()
  isAvailable: boolean;

  @Field(() => RefInput)
  restaurant: RefInput;

  @Field(() => RefInput)
  category: RefInput;

  @Field(() => [RefInput], { nullable: true })
  addons?: RefInput[];

  @Field(() => [CreateVariationInput])
  variations: CreateVariationInput[];
}
