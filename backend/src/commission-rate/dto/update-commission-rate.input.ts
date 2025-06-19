import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateCommissionRateInput } from './create-commission-rate.input';

@InputType()
export class UpdateCommissionRateInput extends PartialType(
  CreateCommissionRateInput,
) {
  @Field(() => ID)
  id: string;
}
