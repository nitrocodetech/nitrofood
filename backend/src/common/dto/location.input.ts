import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => [Float], { description: 'Longitude and Latitude' })
  coordinates: [number, number];
}
