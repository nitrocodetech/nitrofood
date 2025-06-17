import { CreateCuisineInput } from './create-cuisine.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateCuisineInput extends PartialType(CreateCuisineInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
