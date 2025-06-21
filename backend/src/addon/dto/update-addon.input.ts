import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAddonInput } from './create-addon.input';

@InputType()
export class UpdateAddonInput extends PartialType(CreateAddonInput) {
  @Field()
  id: string;
}
