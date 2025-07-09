// src/stripe/stripe.resolver.ts

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StripeService } from './stripe.service';
import {
  CheckoutSessionResponse,
  CreateCheckoutSessionInput,
} from './dto/create-checkout-session.dto';

@Resolver()
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @Mutation(() => CheckoutSessionResponse)
  async createStripeCheckoutSession(
    @Args('input') input: CreateCheckoutSessionInput,
  ): Promise<CheckoutSessionResponse> {
    return this.stripeService.createCheckoutSession(input);
  }

  @Query(() => Boolean)
  async getPaymentStatus(
    @Args('sessionId') sessionId: string,
  ): Promise<boolean> {
    return this.stripeService.checkPaymentStatus(sessionId);
  }
}
