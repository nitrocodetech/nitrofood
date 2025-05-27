import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;
}
