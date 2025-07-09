import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { DeliveryZoneType } from '../entities/restaurant.entity';
import { IsUrl } from 'class-validator';
import { RefInput } from 'src/common/dto/ref.input';
import { LocationInput } from 'src/common/dto/location.input';

@InputType()
class TimingEntryInput {
  @Field()
  day: string;

  @Field(() => [[String]])
  times: string[][];
}

@InputType()
class DeliveryZoneInput {
  @Field(() => [[[Float]]], { nullable: true })
  coordinates?: number[][][];
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

  @Field(() => [RefInput])
  cuisines: RefInput[];

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

  @Field(() => RefInput)
  zone: RefInput;
}
