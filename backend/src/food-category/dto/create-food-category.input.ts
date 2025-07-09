import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodCategoryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true })
  isActive: boolean;
}
