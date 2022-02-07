import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class createUserGraphQLDTO {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  nickname: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType()
export class userDTO {
  @Field(() => Int)
  id: number;

  body: string;

  @Field(() => Int)
  publishedAt: number;

  authorNickname: string;
}
