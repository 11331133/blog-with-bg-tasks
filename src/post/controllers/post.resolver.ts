import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {User} from 'src/user/controllers/user.graphql-model';
import { PostService } from '../domain/post.service';
import {
  createPostGraphQLDTO,
  paginatedPostsDTO,
  paginationDTO,
  postDeletedPayload,
  updatePostGraphQLDTO,
} from './post.dto';
import { Post } from './post.graphql-model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @ResolveField(() => User)
  async author(@Parent() post: Post) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {}

  @Query(() => Post, { name: 'Post', nullable: true })
  async getPost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Post> {
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

  @Mutation(() => Post)
  async createPost(
    @Args('input') createPostDTO: createPostGraphQLDTO,
  ): Promise<Post> {
    return await this.postService.create(createPostDTO, 'author');
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('update') updatePostDTO: updatePostGraphQLDTO,
  ): Promise<Post> {
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
