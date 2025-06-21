import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateVariationInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  discountPrice?: number;

  @Field({ defaultValue: true })
  isAvailable: boolean;
}
