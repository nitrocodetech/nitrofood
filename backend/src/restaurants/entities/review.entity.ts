// src/reviews/entities/review.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column('int')
  rating: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
