import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Polygon } from 'geojson';

@ObjectType()
export class Zone {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  polygon: Polygon;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
