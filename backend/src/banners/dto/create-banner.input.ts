import { InputType, Field } from '@nestjs/graphql';
import { BannerType, BannerTargetType } from '../entities/banner.entity';
import { IsUrl } from 'class-validator';

@InputType()
export class CreateBannerInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => BannerType)
  type: BannerType;

  @Field()
  @IsUrl()
  url: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => BannerTargetType)
  targetType: BannerTargetType;

  @Field({ nullable: true })
  targetId?: string;

  @Field({ defaultValue: 0 })
  position: number;
}
