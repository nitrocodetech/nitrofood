import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Restaurant]),
    forwardRef(() => StripeModule), // ✅ fix circular dep
  ],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService], // ✅ expose to StripeModule
})
export class OrdersModule {}
