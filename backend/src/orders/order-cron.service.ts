// // src/orders/order-cron.service.ts

// import { Injectable, Logger } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order, OrderDocument } from './schemas/order.schema';

// @Injectable()
// export class OrderCronService {
//   private readonly logger = new Logger(OrderCronService.name);

//   constructor(
//     @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
//   ) {}

//   // Runs every 15 minutes
//   @Cron('*/15 * * * *')
//   async handleOrderExpiry() {
//     const now = new Date();
//     const expiryCutoff = new Date(now.getTime() - 30 * 60 * 1000); // 30 mins ago

//     const result = await this.orderModel.updateMany(
//       {
//         status: 'pending', // Or whatever your pending status is
//         createdAt: { $lt: expiryCutoff },
//       },
//       {
//         $set: { status: 'expired' },
//       },
//     );

//     this.logger.log(`🕒 Expired ${result.modifiedCount} unpaid orders`);
//   }
// }
