import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PREPARING = 'preparing',
  READY = 'ready',
  ASSIGNED = 'assigned',
  RIDER_ACCEPTED = 'rider_accepted',
  RIDER_PICKED = 'rider_picked',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'The current status of an order',
});
