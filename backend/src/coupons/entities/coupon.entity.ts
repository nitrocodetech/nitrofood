import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Coupon {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  code: string;

  @Field()
  @Column()
  discountPercentage: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  maxDiscount?: number;

  @Column({ nullable: true })
  maxUses?: number;

  @Column({ nullable: true })
  maxUsesPerUser?: number;

  @Column({ default: 0 })
  usedCount: number;

  @Field()
  @Column()
  minOrderAmount: number;

  @Column({ nullable: true })
  startDate?: Date;

  @Field()
  @Column()
  expiryDate: Date;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
