import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { ZoneModule } from './zone/zone.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DatabaseModule } from './database/database.module';
import GraphQLJSON from 'graphql-type-json';

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
    // AuthModule,
    UsersModule,
    ZoneModule,
    RestaurantsModule,
  ],
})
export class AppModule {}
