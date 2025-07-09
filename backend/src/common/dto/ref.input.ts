import { InputType, Field, ID } from '@nestjs/graphql';

@InputType('RefInput') // ✅ Explicit name
export class RefInput {
  @Field(() => ID)
  id: string;
}
