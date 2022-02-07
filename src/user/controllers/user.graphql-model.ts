import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGraphQLModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: false })
  nickname: string;

  @Field({ nullable: false })
  email: string;
}
