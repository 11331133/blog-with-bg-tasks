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
import { paginatedPostsDTO, paginationDTO, postDTO } from './post.dto';
import { PostGraphQLModel } from './post.graphql-model';

@Resolver(() => PostGraphQLModel)
export class PostResolver {
  constructor(private postService: PostService) {}

  // @ResolveField(() => User)
  // async author(@Parent() post: PostGraphQLModel) {}

  // @ResolveField(() => [Comment])
  // async comments(@Parent() post: Post) {}

  @Query(() => PostGraphQLModel, { name: 'post' })
  async getPost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PostGraphQLModel> {
    return (await this.postService.findByIds([id])).shift();
  }

  @Query(() => Object)
  async getPaginatedPosts(
    @Args('paginationInfo') { page, perPage }: paginationDTO,
  ): Promise<paginatedPostsDTO> {
    const { posts, totalPages, totalEntities } =
      await this.postService.findPaginated(page, perPage);

    return {
      posts,
      totalPages,
      totalEntities,
      isLastPage: page === totalPages,
    };
  }

  @Mutation(() => PostGraphQLModel)
  async createPost(@Args('createPostDTO') createPostDTO: createPostDTO) {}

  @Mutation(() => PostGraphQLModel)
  async updatePost(@Args('updatePostDTO') updatePostDTO: updatePostDTO) {}

  @Mutation(() => {})
  async deletePost(@Args('deletePostDTO') deletePostDTO: deletePostDTO) {}
}
