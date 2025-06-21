import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class CreateCouponInput {
  @Field()
  code: string;

  @Field()
  @Min(1)
  @Max(100)
  discountPercentage: number;

  @Field({ nullable: true })
  @IsOptional()
  maxDiscount?: number;

  @Field()
  minOrderAmount: number;

  @Field()
  @IsDateString()
  expiryDate: Date;

  @Field({ defaultValue: true })
  isActive: boolean;
}
