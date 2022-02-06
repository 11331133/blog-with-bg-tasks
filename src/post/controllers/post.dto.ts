import { createPostDTO, updatePostDTO } from '../domain/post.dto';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
export class paginationDTO {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;
}

@ObjectType()
export class paginatedPostsDTO {
  posts: PostGraphQLModel[];
  totalPages: number;
  totalEntities: number;
  isLastPage: boolean;
}

@ObjectType()
export class updatePostGraphQLDTO extends updatePostDTO {}
