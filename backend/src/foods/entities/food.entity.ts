import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { FoodCategory } from 'src/food-category/entities/food-category.entity';
import { Variation } from './variation.entity';
import { Addon } from 'src/addon/entities/addon.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Food {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo?: string;

  @Field()
  @Column({ default: true })
  isAvailable: boolean;

  // ✅ Direct relation to Restaurant (sends object with id from frontend)
  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, {
    eager: true,
    nullable: false,
  })
  restaurant: Restaurant;

  @Field(() => FoodCategory)
  @ManyToOne(() => FoodCategory, {
    eager: true,
    nullable: false,
  })
  category: FoodCategory;

  // ✅ Required variations: no nullable here
  @Field(() => [Variation])
  @OneToMany(() => Variation, (variation) => variation.food, {
    cascade: true,
    eager: true,
  })
  variations: Variation[];

  @Field(() => [Addon], { nullable: true })
  @ManyToMany(() => Addon, {
    eager: true,
    cascade: false,
  })
  @JoinTable()
  addons: Addon[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
