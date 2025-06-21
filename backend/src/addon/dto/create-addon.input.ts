import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateAddonInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ defaultValue: true })
  isAvailable: boolean;

  @Field()
  foodItemId: string;
}
