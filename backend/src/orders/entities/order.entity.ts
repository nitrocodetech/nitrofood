// src/orders/entities/order.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Rider } from 'src/riders/entities/rider.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  orderCode: string;

  // ✅ Direct relation to User (sends object with id from frontend)
  @Field(() => User)
  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
  })
  user: User;

  // ✅ Direct relation to Restaurant (sends object with id from frontend)
  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, {
    eager: true,
    nullable: false,
  })
  restaurant: Restaurant;

  // ✅ Direct relation to Rider (sends object with id from frontend)
  @Field(() => Rider)
  @ManyToOne(() => Rider, {
    eager: true,
    nullable: true,
  })
  rider?: Rider;

  @Column('jsonb')
  foodItems: {
    id: string;
    name: string;
    variation: {
      id: string;
      name: string;
      price: number;
      discountPrice?: number;
      quantity: number;
    }[];
    addons?: { id: string; name: string; price: number }[];
    instructions?: string;
  }[];

  @Column('float')
  subTotal: number;

  @Column('float', { nullable: true })
  tip: number;

  @Column('float', { nullable: true })
  promoDiscount: number;

  @Column('float', { nullable: true })
  deliveryFee: number;

  @Column('float')
  tax: number;

  @Column('float')
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: true })
  paymentMethod: 'stripe' | 'cash' | 'wallet';

  @Column({ type: 'enum', enum: PaymentStatus, nullable: true })
  paymentStatus?: PaymentStatus;

  @Column({ nullable: true })
  stripeSessionId?: string;

  @Column({ nullable: true })
  paymentIntentId?: string;

  @Column({ nullable: true })
  type: 'pickup' | 'delivery';

  @Column()
  deliveryAddress: string;

  @Field(() => GraphQLJSON)
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  deliveryLocation?: Point;

  @Column({ nullable: true })
  deliveryInstructions?: string;

  @Column({ default: false })
  isScheduled: boolean;

  @Column({ nullable: true })
  scheduledAt?: Date;

  @Column({ nullable: true })
  deliveredAt?: Date;

  @Column({ nullable: true })
  cancelledBy?: 'user' | 'restaurant' | 'admin';

  @Column({ nullable: true })
  cancelledReason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
