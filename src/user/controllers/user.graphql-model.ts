import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  nickname: string;

  @Field({ nullable: false })
  email: string;
}
