import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class WithdrawRequest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
