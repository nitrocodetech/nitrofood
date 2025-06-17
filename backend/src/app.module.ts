import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ZoneModule } from './zone/zone.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DatabaseModule } from './database/database.module';
import GraphQLJSON from 'graphql-type-json';
import { AuthModule } from './auth/auth.module';
import { CuisineModule } from './cuisine/cuisine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // required for in-browser GUI
      introspection: true, // needed for Postman or GraphQL clients to fetch schema
      resolvers: { JSON: GraphQLJSON }, // register JSON scalar
    }),

    DatabaseModule,
    AuthModule,
    UsersModule,
    ZoneModule,
    RestaurantsModule,
    CuisineModule,
  ],
})
export class AppModule {}
