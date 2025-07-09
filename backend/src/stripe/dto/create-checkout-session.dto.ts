// src/stripe/dto/create-checkout-session.input.ts

import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class StripeItemInput {
  @Field()
  name: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class CheckoutSessionResponse {
  @Field()
  sessionUrl: string;

  @Field()
  sessionId: string;

  @Field({ nullable: true })
  paymentIntentId?: string;
}

@InputType()
export class CreateCheckoutSessionInput {
  @Field()
  orderId: string; // ✅ Add this line

  @Field(() => [StripeItemInput])
  items: StripeItemInput[];

  @Field(() => Int)
  tip: number;
}
