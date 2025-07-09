import { CreateConfigurationInput } from './create-configuration.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConfigurationInput extends PartialType(CreateConfigurationInput) {
  @Field(() => Int)
  id: number;
}
