import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentService } from '../domain/comment.service';
import {
  createCommentGraphQLDTO,
  commentDeletedPayload,
  commentDTO,
  updateCommentGraphQLDTO,
} from './comment.dto';
import { CommentGraphQLModel } from './comment.graphql-model';

@Resolver(() => CommentGraphQLModel)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  // @ResolveField(() => User)
  // async author(@Parent() coment: CommentGraphQLModel) {}

  @Query(() => CommentGraphQLModel, { name: 'comment', nullable: true })
  async getComment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CommentGraphQLModel> {
    return (await this.commentService.findByIds([id])).shift();
  }

  @Mutation(() => CommentGraphQLModel)
  async createComment(
    @Args('input') createCommentDTO: createCommentGraphQLDTO,
  ): Promise<CommentGraphQLModel> {
    return await this.commentService.create(createCommentDTO, 'author');
  }

  @Mutation(() => CommentGraphQLModel)
  async updateComment(
    @Args('update') updateCommentDTO: updateCommentGraphQLDTO,
  ): Promise<CommentGraphQLModel> {
    return await this.commentService.update(updateCommentDTO);
  }

  @Mutation(() => commentDeletedPayload)
  async deleteComment(
    @Args('input', { type: () => Int }) deleteCommentDTO: number,
  ): Promise<commentDeletedPayload> {
    await this.commentService.remove(deleteCommentDTO);

    return {
      response: true,
    };
  }
}
