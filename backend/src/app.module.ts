import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ZoneModule } from './zone/zone.module';
import { VendorsModule } from './vendors/vendors.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // required for in-browser GUI
      introspection: true, // needed for Postman or GraphQL clients to fetch schema
    }),

    AuthModule,
    UsersModule,
    ZoneModule,
    VendorsModule,
    RestaurantsModule,
  ],
})
export class AppModule {}
