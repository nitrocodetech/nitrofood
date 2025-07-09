import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { OrdersService } from 'src/orders/orders.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly ordersService: OrdersService, // ✅ no forwardRef here
  ) {}

  @Post('stripe')
  async handleStripeEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-05-28.basil',
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      return res.status(400).send('Webhook Error: Unknown error occurred');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.ordersService.markOrderPaid(session.id);
    }

    return res.json({ received: true });
  }
}
