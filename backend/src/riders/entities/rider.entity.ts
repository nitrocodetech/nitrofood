import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Point,
} from 'typeorm';

export enum VehicleType {
  BIKE = 'BIKE',
  CAR = 'CAR',
  BICYCLE = 'BICYCLE',
}

registerEnumType(VehicleType, {
  name: 'VehicleType',
});

@ObjectType()
@Entity()
export class Rider {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field()
  @Column()
  password: string;

  @Field(() => VehicleType, { nullable: true })
  @Column({ nullable: true })
  vehicleType: VehicleType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  vehicleNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  licenseNumber: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  hasRequested: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  requestAccepted: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location?: Point;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pushToken?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Zone)
  @ManyToOne(() => Zone, {
    cascade: false,
    eager: true,
  })
  zone: Zone;
}
