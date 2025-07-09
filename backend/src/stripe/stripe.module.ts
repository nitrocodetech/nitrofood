import { Module, forwardRef } from '@nestjs/common';
import { StripeResolver } from './stripe.resolver';
import { StripeService } from './stripe.service';
import { WebhookController } from '../webhook/stripe.webhook.controller';
import { OrdersModule } from 'src/orders/orders.module'; // ✅

@Module({
  imports: [forwardRef(() => OrdersModule)], // ✅ fix circular dep
  providers: [StripeResolver, StripeService],
  controllers: [WebhookController],
  exports: [StripeService],
})
export class StripeModule {}
