import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WithdrawRequestService } from './withdraw-request.service';
import { WithdrawRequest } from './entities/withdraw-request.entity';
import { CreateWithdrawRequestInput } from './dto/create-withdraw-request.input';
import { UpdateWithdrawRequestInput } from './dto/update-withdraw-request.input';

@Resolver(() => WithdrawRequest)
export class WithdrawRequestResolver {
  constructor(private readonly withdrawRequestService: WithdrawRequestService) {}

  @Mutation(() => WithdrawRequest)
  createWithdrawRequest(@Args('createWithdrawRequestInput') createWithdrawRequestInput: CreateWithdrawRequestInput) {
    return this.withdrawRequestService.create(createWithdrawRequestInput);
  }

  @Query(() => [WithdrawRequest], { name: 'withdrawRequest' })
  findAll() {
    return this.withdrawRequestService.findAll();
  }

  @Query(() => WithdrawRequest, { name: 'withdrawRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.withdrawRequestService.findOne(id);
  }

  @Mutation(() => WithdrawRequest)
  updateWithdrawRequest(@Args('updateWithdrawRequestInput') updateWithdrawRequestInput: UpdateWithdrawRequestInput) {
    return this.withdrawRequestService.update(updateWithdrawRequestInput.id, updateWithdrawRequestInput);
  }

  @Mutation(() => WithdrawRequest)
  removeWithdrawRequest(@Args('id', { type: () => Int }) id: number) {
    return this.withdrawRequestService.remove(id);
  }
}
