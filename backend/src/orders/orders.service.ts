import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { StripeService } from 'src/stripe/stripe.service';
import { generateOrderCode } from 'src/utils/generateOrderCode';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { calculateDistanceInKm } from 'src/utils/calulateDistanceInKm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

const RATE_PER_KM = 50;
const CURRENCY_MULTIPLIER = 100;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,

    private stripeService: StripeService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<string> {
    const {
      foodItems,
      tip = 0,
      deliveryFee = 0,
      tax = 0,
      promoDiscount = 0,
      paymentMethod,
      type,
      deliveryLocation,
    } = createOrderInput;

    let subTotal = 0;

    const formattedItems = foodItems.map((item) => {
      const variation = item.variation[0];
      const basePrice = variation.discountPrice ?? variation.price;
      const addonsPrice =
        item.addons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
      const unitPrice = basePrice + addonsPrice;
      const quantity = variation.quantity;
      const total = unitPrice * quantity;
      subTotal += total;

      return {
        ...item,
        variation: [variation],
        addons: item.addons ?? [],
        instructions: item.instructions ?? '',
      };
    });

    let deliveryFeeToUse = deliveryFee;

    if (type === 'delivery' && deliveryLocation?.coordinates?.length === 2) {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id: createOrderInput.restaurant.id },
        select: ['id', 'location'],
      });

      if (!restaurant) throw new Error('Restaurant not found');

      const restaurantCoords = restaurant.location.coordinates as [
        number,
        number,
      ];
      const deliveryCoords = deliveryLocation.coordinates;

      const distanceKm = calculateDistanceInKm(
        restaurantCoords,
        deliveryCoords,
      );
      deliveryFeeToUse = Math.ceil(distanceKm * RATE_PER_KM);
      console.log(
        '🚀 ~ OrdersService ~ create ~ deliveryFeeToUse:',
        deliveryFeeToUse,
      );
    }

    const totalAmount = subTotal + tip + deliveryFeeToUse + tax - promoDiscount;

    let orderCode = generateOrderCode();
    while (await this.orderRepo.findOne({ where: { orderCode } })) {
      orderCode = generateOrderCode();
    }

    const newOrder = this.orderRepo.create({
      ...createOrderInput,
      foodItems: formattedItems,
      subTotal,
      totalAmount,
      ...(deliveryLocation && {
        deliveryLocation: {
          type: 'Point',
          coordinates: deliveryLocation.coordinates,
        },
      }),
      deliveryFee: deliveryFeeToUse,
      orderCode,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
    });

    const savedOrder = await this.orderRepo.save(newOrder);

    if (paymentMethod === 'stripe') {
      // Step 1: Prepare foodItems with pricing details
      let foodTotal = 0;
      const foodItemsData = foodItems.map((item) => {
        const variation = item.variation[0];
        const addonsPrice =
          item.addons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
        const unitPrice =
          (variation.discountPrice ?? variation.price) + addonsPrice;
        const quantity = variation.quantity;
        const total = unitPrice * quantity;
        foodTotal += total;

        return { item, variation, unitPrice, quantity, total };
      });

      // Step 2: Distribute discount proportionally to each food item
      const stripeItems = foodItemsData.map(
        ({ item, variation, unitPrice, quantity, total }) => {
          const shareOfTotal = total / foodTotal;
          const discountShare = promoDiscount * shareOfTotal;
          const discountedUnitPrice = unitPrice - discountShare / quantity;

          return {
            name: `${item.name} (${variation.name})`,
            amount: Math.round(discountedUnitPrice * CURRENCY_MULTIPLIER),
            quantity,
          };
        },
      );

      // Step 3: Add delivery, tax, tip
      if (deliveryFeeToUse > 0) {
        stripeItems.push({
          name: 'Delivery Fee',
          amount: Math.round(deliveryFeeToUse * CURRENCY_MULTIPLIER),
          quantity: 1,
        });
      }

      if (tax > 0) {
        stripeItems.push({
          name: 'Tax',
          amount: Math.round(tax * CURRENCY_MULTIPLIER),
          quantity: 1,
        });
      }

      if (tip > 0) {
        stripeItems.push({
          name: 'Tip',
          amount: Math.round(tip * CURRENCY_MULTIPLIER),
          quantity: 1,
        });
      }

      // Step 4: Create Stripe Checkout session
      const {
        sessionUrl: url,
        sessionId,
        paymentIntentId,
      } = await this.stripeService.createCheckoutSession({
        orderId: savedOrder.id,
        items: stripeItems,
      });

      await this.orderRepo.update(savedOrder.id, {
        stripeSessionId: sessionId,
        ...(paymentIntentId && { paymentIntentId }),
      });

      return url;
    }

    return savedOrder.id;
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: string) {
    return this.orderRepo.findOne({ where: { id } });
  }

  update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.orderRepo.save({ ...updateOrderInput, id });
  }

  remove(id: string) {
    return this.orderRepo.delete(id);
  }

  async findBySessionId(sessionId: string) {
    return this.orderRepo.findOne({ where: { stripeSessionId: sessionId } });
  }

  async markOrderPaid(sessionId: string) {
    const order = await this.findBySessionId(sessionId);
    if (order) {
      await this.orderRepo.update(order.id, {
        status: OrderStatus.ACCEPTED,
        paymentStatus: PaymentStatus.PAID,
      });
    }
  }

  async retryOrderPayment(orderId: string): Promise<string> {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    const stripeItems = order.foodItems.map((item) => {
      const variation = item.variation[0];
      const addonsPrice =
        item.addons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
      const unitPrice = variation.price + addonsPrice;
      return {
        name: `${item.name} (${variation.name})`,
        amount: Math.round(unitPrice * 100),
        quantity: variation.quantity,
      };
    });

    if (order.stripeSessionId) {
      const isExpired = await this.stripeService.isSessionExpired(
        order.stripeSessionId,
      );
      if (!isExpired) {
        return `https://checkout.stripe.com/pay/${order.stripeSessionId}`;
      }
    }

    const { sessionUrl, sessionId, paymentIntentId } =
      await this.stripeService.createCheckoutSession({
        orderId,
        items: stripeItems,
      });

    await this.orderRepo.update(orderId, {
      stripeSessionId: sessionId,
      ...(paymentIntentId && { paymentIntentId }),
    });

    return sessionUrl;
  }
}
