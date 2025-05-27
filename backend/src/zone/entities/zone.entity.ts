import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Polygon } from 'geojson';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Zone {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  polygon: Polygon;

  @Field(() => String)
  userId: string;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
