import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum BannerType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum BannerTargetType {
  RESTAURANT = 'RESTAURANT',
  FOOD = 'FOOD',
  NONE = 'NONE',
}

registerEnumType(BannerType, {
  name: 'BannerType',
});

registerEnumType(BannerTargetType, {
  name: 'BannerTargetType',
});

@ObjectType()
@Entity()
export class Banner {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => BannerType)
  @Column({ type: 'enum', enum: BannerType })
  type: BannerType;

  @Field()
  @Column()
  url: string; // Image or video URL

  @Field()
  @Column({ default: 0 })
  position: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail?: string; // Optional for video

  @Field(() => BannerTargetType)
  @Column({
    type: 'enum',
    enum: BannerTargetType,
    default: BannerTargetType.NONE,
  })
  targetType: BannerTargetType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  targetId?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
