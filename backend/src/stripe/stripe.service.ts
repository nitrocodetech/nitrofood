// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

const STRIPE_CURRENCY = 'pkr';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-05-28.basil',
    });
  }

  async createCheckoutSession(params: {
    orderId: string;
    items: { name: string; amount: number; quantity?: number }[];
  }) {
    const lineItems = params.items.map((item) => ({
      price_data: {
        currency: STRIPE_CURRENCY,
        product_data: { name: item.name },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: 'test@example.com',
      metadata: {
        orderId: params.orderId,
      },
      success_url: 'myapp://payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'myapp://payment-cancelled',
    });

    return {
      sessionUrl: session.url!,
      sessionId: session.id,
      paymentIntentId:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : undefined,
    };
  }

  async checkPaymentStatus(sessionId: string): Promise<boolean> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === 'paid';
  }

  async isSessionExpired(sessionId: string): Promise<boolean> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return session.status === 'expired' || session.payment_status === 'paid';
  }
}
