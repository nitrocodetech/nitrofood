import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommissionRate } from './entities/commission-rate.entity';
import { CommissionRateService } from './commission-rate.service';
import { CreateCommissionRateInput } from './dto/create-commission-rate.input';
import { UpdateCommissionRateInput } from './dto/update-commission-rate.input';

@Resolver(() => CommissionRate)
export class CommissionRateResolver {
  constructor(private readonly commissionRateService: CommissionRateService) {}

  @Mutation(() => CommissionRate)
  createCommissionRate(
    @Args('createCommissionRateInput') input: CreateCommissionRateInput,
  ) {
    return this.commissionRateService.create(input);
  }

  @Query(() => [CommissionRate])
  commissionRates() {
    return this.commissionRateService.findAll();
  }

  @Query(() => CommissionRate)
  commissionRate(@Args('id', { type: () => String }) id: string) {
    return this.commissionRateService.findOne(id);
  }

  @Mutation(() => CommissionRate)
  updateCommissionRate(
    @Args('updateCommissionRateInput') input: UpdateCommissionRateInput,
  ) {
    return this.commissionRateService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeCommissionRate(@Args('id', { type: () => String }) id: string) {
    return this.commissionRateService.remove(id).then(() => true);
  }

  @Query(() => CommissionRate, { nullable: true })
  commissionRateByVendor(@Args('vendorId') vendorId: string) {
    return this.commissionRateService.findByVendorId(vendorId);
  }
}
