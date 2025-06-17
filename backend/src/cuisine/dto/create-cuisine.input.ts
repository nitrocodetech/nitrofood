import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateCuisineInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  photo: string;
}
