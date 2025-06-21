import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCouponInput } from './create-coupon.input';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  @Field()
  id: string;
}
