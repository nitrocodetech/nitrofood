import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodCategoryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ defaultValue: true })
  isActive: boolean;
}
