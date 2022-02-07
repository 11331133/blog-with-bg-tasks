import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentGraphQLModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: false })
  body: string;

  // @Field(type => Author)
  // author: Author;

  @Field((type) => Int)
  publishedAt: number;
}
