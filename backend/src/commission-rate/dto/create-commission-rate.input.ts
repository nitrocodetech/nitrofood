import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCommissionRateInput {
  @Field()
  restaurantId: string;

  @Field(() => Float)
  percentage: number;
}
