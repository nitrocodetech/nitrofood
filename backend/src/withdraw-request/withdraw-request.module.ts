import { Module } from '@nestjs/common';
import { WithdrawRequestService } from './withdraw-request.service';
import { WithdrawRequestResolver } from './withdraw-request.resolver';

@Module({
  providers: [WithdrawRequestResolver, WithdrawRequestService],
})
export class WithdrawRequestModule {}
