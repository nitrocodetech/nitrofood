import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Food } from 'src/foods/entities/food.entity';

@ObjectType()
@Entity()
export class Variation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  discountPrice?: number; // e.g., $12 instead of $15

  @Field()
  @Column({ default: true })
  isAvailable: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Food)
  @ManyToOne(() => Food, (food) => food.variations, {
    onDelete: 'CASCADE',
  })
  food: Food;
}
