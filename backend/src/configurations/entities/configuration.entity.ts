import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Configuration {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
