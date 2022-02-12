import {
  Field,
  GraphQLISODateTime,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import CommentEntity from '../domain/comment.entity';
import { Comment } from './comment.graphql-model';

export type CommentParent = Omit<Comment, 'author'> &
  Pick<CommentEntity, 'authorId'>;

@InputType()
export class createCommentInput {
  @Field({ nullable: false })
  body: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field({ nullable: false })
  postId: string;
}

@ObjectType()
export class createCommentPayload {
  @Field({ nullable: false })
  id: string;
}

@InputType()
export class editCommentInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  body: string;
}

@ObjectType()
export class editCommentPayload {
  @Field()
  response: boolean;
}

@ObjectType()
export class deleteCommentPayload {
  @Field()
  response: boolean;
}
