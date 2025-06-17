import { InputType, Field, Int, Float, ID } from '@nestjs/graphql';
import { DeliveryZoneType } from '../entities/restaurant.entity';
import { IsUrl } from 'class-validator';

@InputType()
export class TimingEntryInput {
  @Field()
  day: string;

  @Field(() => [[String]])
  times: string[][];
}

@InputType()
export class DeliveryZoneInput {
  @Field(() => [[[Float]]], { nullable: true }) // polygon coordinates
  coordinates?: number[][][];
}

@InputType()
export class LocationInput {
  @Field(() => [Float], { description: 'Longitude and Latitude' })
  coordinates: [number, number];
}

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  address: string;

  @Field(() => Float, { nullable: true })
  tax?: number;

  @Field(() => [String])
  cuisines: string[];

  @Field(() => Int)
  minDeliveryTime: number;

  @Field(() => Int)
  maxDeliveryTime: number;

  @Field({ nullable: true })
  @IsUrl()
  coverPhoto?: string;

  @Field({ nullable: true })
  @IsUrl()
  profilePhoto?: string;

  @Field(() => LocationInput)
  location: LocationInput;

  @Field(() => DeliveryZoneType)
  deliveryZoneType: DeliveryZoneType;

  @Field({ nullable: true })
  deliveryZoneRadius: number;

  @Field(() => DeliveryZoneInput, { nullable: true })
  deliveryZone?: DeliveryZoneInput;

  @Field(() => [TimingEntryInput], { nullable: true })
  timings?: TimingEntryInput[];

  @Field(() => ID)
  zoneId: string; // relational id to zone
}
