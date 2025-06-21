import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Coupon } from './entities/coupon.entity';
import { CouponsService } from './coupons.service';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';

@Resolver(() => Coupon)
export class CouponsResolver {
  constructor(private readonly couponsService: CouponsService) {}

  @Mutation(() => Coupon)
  createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponsService.create(createCouponInput);
  }

  @Query(() => [Coupon])
  coupons() {
    return this.couponsService.findAll();
  }

  @Query(() => Coupon)
  coupon(@Args('id', { type: () => String }) id: string) {
    return this.couponsService.findOne(id);
  }

  @Mutation(() => Coupon)
  updateCoupon(
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput,
  ) {
    return this.couponsService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation(() => Boolean)
  removeCoupon(@Args('id', { type: () => String }) id: string) {
    return this.couponsService.remove(id);
  }
}
