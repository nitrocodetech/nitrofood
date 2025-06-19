import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Banner } from './entities/banner.entity';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';
import { BannerService } from './banners.service';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => Banner)
  createBanner(
    @Args('createBannerInput') createBannerInput: CreateBannerInput,
  ) {
    return this.bannerService.create(createBannerInput);
  }

  @Query(() => [Banner])
  banners() {
    return this.bannerService.findAll();
  }

  @Query(() => Banner)
  banner(@Args('id', { type: () => String }) id: string) {
    return this.bannerService.findOne(id);
  }

  @Mutation(() => Banner)
  updateBanner(
    @Args('updateBannerInput') updateBannerInput: UpdateBannerInput,
  ) {
    return this.bannerService.update(updateBannerInput.id, updateBannerInput);
  }

  @Mutation(() => Boolean)
  removeBanner(@Args('id', { type: () => String }) id: string) {
    return this.bannerService.remove(id).then(() => true);
  }
}
