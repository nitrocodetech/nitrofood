import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';

// ---- Enums ----

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
}

export enum AddressType {
  HOME = 'HOME',
  CUSTOM = 'CUSTOM',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

registerEnumType(AddressType, {
  name: 'AddressType',
});

// ---- Nested Types ----

@ObjectType()
class Coordinates {
  @Field(() => Float)
  lng: number;

  @Field(() => Float)
  lat: number;
}

@ObjectType()
class Address {
  @Field(() => AddressType)
  type: AddressType;

  @Field(() => Coordinates)
  coordinates: Coordinates;
}

// ---- Main User Type ----

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Boolean)
  emailVerified: boolean = false;

  @Field(() => Boolean)
  phoneVerified: boolean = false;

  @Field(() => [Address], { nullable: true })
  address?: Address[];

  @Field({ nullable: true })
  bussinessRegNo?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
