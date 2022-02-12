import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from 'src/user/controllers/user.graphql-model';

@ObjectType()
export class Post {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => User)
  author: User;

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => GraphQLISODateTime)
  publishedAt: Date;
}
