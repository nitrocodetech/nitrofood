import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
  description: 'The current payment status of an order',
});
