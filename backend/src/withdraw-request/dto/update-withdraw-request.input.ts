import { CreateWithdrawRequestInput } from './create-withdraw-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWithdrawRequestInput extends PartialType(CreateWithdrawRequestInput) {
  @Field(() => Int)
  id: number;
}
