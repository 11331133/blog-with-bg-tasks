import { createPostDTO, updatePostDTO } from '../domain/post.dto';
import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { PostGraphQLModel } from './post.graphql-model';

@ObjectType()
export class createPostGraphQLDTO extends createPostDTO {
  @Field(() => Int)
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

@ObjectType()
export class updatePostGraphQLDTO extends updatePostDTO {}
