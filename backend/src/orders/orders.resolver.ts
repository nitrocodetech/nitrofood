// src/orders/orders.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => String, {
    description: 'Create order and get Stripe session URL',
  })
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Boolean)
  async removeOrder(@Args('id') id: string) {
    return this.ordersService.remove(id).then(() => true);
  }

  @Mutation(() => String, {
    description:
      'Retry payment for an existing order (returns Stripe session URL)',
  })
  retryOrderPayment(@Args('orderId') orderId: string) {
    return this.ordersService.retryOrderPayment(orderId);
  }
}
