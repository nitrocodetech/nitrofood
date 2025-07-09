import { InputType, Field } from '@nestjs/graphql';
import { VehicleType } from '../entities/rider.entity';
import { RefInput } from 'src/common/dto/ref.input';

@InputType()
export class CreateRiderInput {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => VehicleType, { nullable: true })
  vehicleType?: VehicleType;

  @Field({ nullable: true })
  vehicleNumber?: string;

  @Field({ nullable: true })
  licenseNumber?: string;

  @Field({ nullable: true })
  pushToken?: string;

  @Field(() => RefInput)
  zone: RefInput;
}
