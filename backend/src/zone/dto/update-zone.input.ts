import { CreateZoneInput } from './create-zone.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateZoneInput extends PartialType(CreateZoneInput) {
  @Field()
  id: string;
}
