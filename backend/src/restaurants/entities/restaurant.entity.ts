import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Point,
} from 'typeorm';

export enum DeliveryZoneType {
  CIRCLE = 'circle',
  POLYGON = 'polygon',
}

registerEnumType(DeliveryZoneType, { name: 'DeliveryZoneType' });

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

  @Field(() => [String])
  @Column('text', { array: true })
  cuisines: string[];

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

  @Column() // foreign key column
  zoneId: string;

  // Relation to Zone
  @Field(() => Zone)
  @ManyToOne(() => Zone)
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;
}
