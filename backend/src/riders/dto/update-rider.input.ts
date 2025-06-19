import { CreateRiderInput } from './create-rider.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRiderInput extends PartialType(CreateRiderInput) {
  @Field(() => ID)
  id: string;
}
