import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { createPostDTO, updatePostDTO } from '../domain/post.dto';
import { PostService } from '../domain/post.service';
import { PostGraphQLModel } from './post.graphql-model';

@Resolver(() => PostGraphQLModel)
export class PostResolver {
  constructor(private postService: PostService) {}

  @ResolveField(() => User)
  async author(@Parent() post: PostGraphQLModel) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {}

  @Query(() => PostGraphQLModel, { name: 'post' })
  async getPost(@Args('id', { type: () => Int }) id: number) {}

  @Query(() => Object)
  async getPaginatedPosts(@Args('paginationInfo') paginationInfo: object) {}

  @Mutation(() => PostGraphQLModel)
  async createPost(@Args('createPostDTO') createPostDTO: createPostDTO) {}

  @Mutation(() => PostGraphQLModel)
  async updatePost(@Args('updatePostDTO') updatePostDTO: updatePostDTO) {}

  @Mutation(() => {})
  async deletePost(@Args('deletePostDTO') deletePostDTO: deletePostDTO) {}
}
