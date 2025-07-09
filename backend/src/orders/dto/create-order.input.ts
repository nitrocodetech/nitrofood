// src/orders/dto/create-order.input.ts

import {
  InputType,
  Field,
  Float,
  Int,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { RefInput } from 'src/common/dto/ref.input';
import { LocationInput } from 'src/common/dto/location.input';

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

@InputType()
@InputType()
export class OrderVariationInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  discountPrice?: number;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class OrderAddonInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}

@InputType()
export class OrderItemInput {
  @Field(() => ID)
  id: string; // food ID

  @Field()
  name: string;

  @Field(() => [OrderVariationInput])
  variation: OrderVariationInput[];

  @Field(() => [OrderAddonInput], { nullable: true })
  addons?: OrderAddonInput[];

  @Field({ nullable: true })
  instructions?: string;
}

@InputType()
export class CreateOrderInput {
  @Field(() => RefInput)
  user: RefInput;

  @Field(() => RefInput)
  restaurant: RefInput;

  @Field(() => RefInput, { nullable: true })
  rider?: RefInput;

  @Field(() => [OrderItemInput])
  foodItems: OrderItemInput[];

  @Field(() => Float)
  subTotal: number;

  @Field(() => Float, { nullable: true })
  tip?: number;

  @Field(() => Float, { nullable: true })
  promoDiscount?: number;

  @Field(() => Float, { nullable: true })
  deliveryFee?: number;

  @Field(() => Float)
  tax?: number;

  @Field(() => Float)
  totalAmount: number;

  @Field()
  paymentMethod: 'stripe' | 'cash' | 'wallet';

  @Field(() => PaymentStatus, { nullable: true })
  paymentStatus?: PaymentStatus;

  @Field({ nullable: true })
  stripeSessionId?: string;

  @Field({ nullable: true })
  paymentIntentId?: string;

  @Field({ nullable: true })
  type?: 'pickup' | 'delivery';

  @Field({ nullable: true })
  deliveryAddress?: string;

  @Field(() => LocationInput)
  deliveryLocation?: LocationInput;

  @Field({ nullable: true })
  deliveryInstructions?: string;

  @Field({ nullable: true })
  isScheduled?: boolean;

  @Field({ nullable: true })
  scheduledAt?: Date;

  @Field({ nullable: true })
  deliveredAt?: Date;

  @Field({ nullable: true })
  cancelledBy?: 'user' | 'restaurant' | 'admin';

  @Field({ nullable: true })
  cancelledReason?: string;

  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
}
