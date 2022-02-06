import { createPostDTO, updatePostDTO } from '../domain/post.dto';
import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { PostGraphQLModel } from './post.graphql-model';

@InputType()
export class createPostGraphQLDTO {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => Int, { nullable: true })
  createdAt?: number;
}

@ObjectType()
export class postDTO {
  @Field(() => Int)
  id: number;

  title: string;

  body: string;

  @Field(() => Int)
  publishedAt: number;

  authorNickname: string;
}

@InputType()
export class paginationDTO {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;
}

@ObjectType()
export class paginatedPostsDTO {
  @Field(() => [PostGraphQLModel])
  posts: PostGraphQLModel[];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalEntities: number;

  @Field()
  isLastPage: boolean;
}

@InputType()
export class updatePostGraphQLDTO extends updatePostDTO {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;
}

@ObjectType()
export class postDeletedPayload {
  @Field()
  response: boolean;
}
