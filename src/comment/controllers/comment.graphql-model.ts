import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/controllers/user.graphql-model';

@ObjectType()
export class Comment {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => User, { nullable: false })
  author: User;

  @Field(() => GraphQLISODateTime, { nullable: false })
  publishedAt: Date;
}
