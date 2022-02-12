import {
  Field,
  InputType,
  Int,
  ObjectType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import PostEntity from '../domain/post.entity';
import { Post } from './post.graphql-model';

export type PostParent = Omit<Post, 'author' | 'comments'> &
  Pick<PostEntity, 'authorId'>;

@InputType()
export class createPostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishedAt?: Date;
}

@ObjectType()
export class createPostPayload {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  publishedAt: Date;

  @Field({ nullable: false })
  authorNickname: string;
}

@InputType()
export class getPaginatedPostsInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;
}

@ObjectType()
export class getPaginatedPostsPayload {
  @Field(() => [Post])
  posts: PostParent[];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalEntities: number;

  @Field()
  isLastPage: boolean;
}

@InputType()
export class editPostInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;
}

@ObjectType()
export class editPostPayload {
  @Field()
  response: boolean;
}

@ObjectType()
export class deletePostPayload {
  @Field()
  response: boolean;
}
