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
import { RidersModule } from './riders/riders.module';
import { BannersModule } from './banners/banners.module';
import { CommissionRateModule } from './commission-rate/commission-rate.module';
import { CouponsModule } from './coupons/coupons.module';
import { FoodsModule } from './foods/foods.module';
import { FoodCategoryModule } from './food-category/food-category.module';
import { AddonsModule } from './addon/addon.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { WalletModule } from './wallet/wallet.module';
import { WithdrawRequestModule } from './withdraw-request/withdraw-request.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),

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
    RidersModule,
    BannersModule,
    CommissionRateModule,
    CouponsModule,
    FoodsModule,
    FoodCategoryModule,
    AddonsModule,
    CartModule,
    OrdersModule,
    WalletModule,
    WithdrawRequestModule,
    ConfigurationsModule,
  ],
})
export class AppModule {}
