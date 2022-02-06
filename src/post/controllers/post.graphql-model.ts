import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostGraphQLModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  // @Field(type => Author)
  // author: Author;

  // @Field(type => [Comment])
  // comments: Comment[]

  @Field((type) => Int)
  publishedAt: number;
}
