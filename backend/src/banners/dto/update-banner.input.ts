import { CreateBannerInput } from './create-banner.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBannerInput extends PartialType(CreateBannerInput) {
  @Field()
  id: string;
}
