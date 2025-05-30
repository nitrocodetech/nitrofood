import { CreateZoneInput } from './create-zone.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateZoneInput extends PartialType(CreateZoneInput) {}
