import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from '../domain/post.service';
import {
  createPostGraphQLDTO,
  paginatedPostsDTO,
  paginationDTO,
  postDeletedPayload,
  postDTO,
  updatePostGraphQLDTO,
} from './post.dto';
import { PostGraphQLModel } from './post.graphql-model';

@Resolver(() => PostGraphQLModel)
export class PostResolver {
  constructor(private postService: PostService) {}

  // @ResolveField(() => User)
  // async author(@Parent() post: PostGraphQLModel) {}

  // @ResolveField(() => [Comment])
  // async comments(@Parent() post: Post) {}

  @Query(() => PostGraphQLModel, { name: 'post', nullable: true })
  async getPost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PostGraphQLModel> {
    return (await this.postService.findByIds([id])).shift();
  }

  @Query(() => paginatedPostsDTO, { name: 'paginatedPosts' })
  async getPaginatedPosts(
    @Args('input') { page, perPage }: paginationDTO,
  ): Promise<paginatedPostsDTO> {
    const { posts, totalPages, totalEntities } =
      await this.postService.findPaginated(page, perPage);

    return {
      posts,
      totalPages,
      totalEntities,
      isLastPage: page >= totalPages,
    };
  }

  @Mutation(() => PostGraphQLModel)
  async createPost(
    @Args('input') createPostDTO: createPostGraphQLDTO,
  ): Promise<PostGraphQLModel> {
    return await this.postService.create(createPostDTO, 'author');
  }

  @Mutation(() => PostGraphQLModel)
  async updatePost(
    @Args('update') updatePostDTO: updatePostGraphQLDTO,
  ): Promise<PostGraphQLModel> {
    return await this.postService.update(updatePostDTO);
  }

  @Mutation(() => postDeletedPayload)
  async deletePost(
    @Args('input', { type: () => Int }) deletePostDTO: number,
  ): Promise<postDeletedPayload> {
    await this.postService.remove(deletePostDTO);

    return {
      response: true,
    };
  }
}
