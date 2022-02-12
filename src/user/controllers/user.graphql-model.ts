import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  nickname: string;

  @Field({ nullable: false })
  email: string;
}
