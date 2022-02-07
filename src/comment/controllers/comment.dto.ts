import { updateCommentDTO } from '../domain/comment.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class createCommentGraphQLDTO {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  body: string;

  @Field(() => Int, { nullable: true })
  createdAt?: number;
}

@ObjectType()
export class commentDTO {
  @Field(() => Int)
  id: number;

  body: string;

  @Field(() => Int)
  publishedAt: number;

  authorNickname: string;
}

@InputType()
export class updateCommentGraphQLDTO extends updateCommentDTO {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  body: string;
}

@ObjectType()
export class commentDeletedPayload {
  @Field()
  response: boolean;
}
