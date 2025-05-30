import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class GeoJsonPolygonInput {
  @Field(() => String)
  readonly type: 'Polygon'; // literal type

  @Field(() => [[[Float]]])
  readonly coordinates: number[][][];
}

@InputType()
export class CreateZoneInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => GeoJsonPolygonInput)
  location: GeoJsonPolygonInput;
}
