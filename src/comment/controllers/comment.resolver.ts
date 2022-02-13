import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorators';
import userCredentials from 'src/auth/userCredentials.interface';
import { User } from 'src/user/controllers/user.graphql-model';
import { UserService } from 'src/user/domain/user.service';
import { CommentService } from '../domain/comment.service';
import {
  CommentParent,
  createCommentInput,
  createCommentPayload,
  deleteCommentPayload,
  editCommentInput,
  editCommentPayload,
} from './comment.dto';
import { Comment } from './comment.graphql-model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  @ResolveField(() => User)
  async author(@Parent() comment: CommentParent) {
    return await this.userService.findOne(comment.authorId);
  }

  @Query(() => Comment, { name: 'Comment', nullable: true })
  async getComment(@Args('id') id: string): Promise<CommentParent> {
    return await this.commentService.findOne(id);
  }

  @Mutation(() => createCommentPayload)
  async createComment(
    @Args('createCommentInput') createCommentInput: createCommentInput,
    @CurrentUser() { userId }: userCredentials,
  ): Promise<createCommentPayload> {
    const commentId = await this.commentService.createComment(
      createCommentInput,
      userId,
    );

    return {
      id: commentId,
    };
  }

  @Mutation(() => editCommentPayload)
  async editComment(
    @Args('editCommentInput') editCommentDTO: editCommentInput,
    @CurrentUser() { userId }: userCredentials,
  ): Promise<editCommentPayload> {
    await this.commentService.editComment(editCommentDTO, userId);

    return {
      response: true,
    };
  }

  @Mutation(() => deleteCommentPayload)
  async deleteComment(@Args('id') id: string): Promise<deleteCommentPayload> {
    await this.commentService.deleteComment(id);

    return {
      response: true,
    };
  }
}
