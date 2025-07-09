import { Injectable } from '@nestjs/common';
import { CreateWithdrawRequestInput } from './dto/create-withdraw-request.input';
import { UpdateWithdrawRequestInput } from './dto/update-withdraw-request.input';

@Injectable()
export class WithdrawRequestService {
  create(createWithdrawRequestInput: CreateWithdrawRequestInput) {
    return 'This action adds a new withdrawRequest';
  }

  findAll() {
    return `This action returns all withdrawRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} withdrawRequest`;
  }

  update(id: number, updateWithdrawRequestInput: UpdateWithdrawRequestInput) {
    return `This action updates a #${id} withdrawRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} withdrawRequest`;
  }
}
