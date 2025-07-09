import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConfigurationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
