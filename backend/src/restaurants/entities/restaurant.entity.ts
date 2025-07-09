import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Cuisine } from 'src/cuisine/entities/cuisine.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Point,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Review } from './review.entity';

export enum DeliveryZoneType {
  CIRCLE = 'CIRCLE',
  POLYGON = 'POLYGON',
}

registerEnumType(DeliveryZoneType, {
  name: 'DeliveryZoneType',
  description: 'Type of delivery zone: circle or polygon',
});

@ObjectType()
class TimingEntry {
  @Field()
  @Column()
  day: string;

  @Field(() => [[String]])
  @Column('jsonb')
  times: string[][];
}

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field()
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column('float', { nullable: true })
  tax?: number;

  @Field(() => [Cuisine])
  @ManyToMany(() => Cuisine, { eager: true })
  @JoinTable()
  cuisines: Cuisine[];

  @Field(() => Int)
  @Column('int')
  minDeliveryTime: number;

  @Field(() => Int)
  @Column('int')
  maxDeliveryTime: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverPhoto?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePhoto?: string;

  @Field(() => GraphQLJSON)
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Field(() => DeliveryZoneType)
  @Column()
  deliveryZoneType: DeliveryZoneType;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'float', nullable: true })
  deliveryZoneRadius: number | null;

  @Field(() => GraphQLJSON)
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  deliveryZone: object;

  @Field(() => [TimingEntry])
  @Column('jsonb', { nullable: true })
  timings: TimingEntry[];

  @Field(() => Zone)
  @ManyToOne(() => Zone, {
    cascade: false,
    eager: true,
  })
  zone: Zone;

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.restaurant, {
    cascade: true,
  })
  reviews?: Review[];
}
