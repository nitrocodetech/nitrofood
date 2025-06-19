import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
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

  @Field({ defaultValue: true })
  @Column({ default: true })
  hasRequested: false;

  @Field({ defaultValue: true })
  @Column({ default: true })
  requestAccepted: false;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pushToken?: string;

  @Index()
  @Column()
  zoneId: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relation to Zone
  @Field(() => Zone)
  @ManyToOne(() => Zone)
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;
}
