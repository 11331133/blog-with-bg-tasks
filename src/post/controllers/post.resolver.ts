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
import { BlogLoader } from 'src/utils/blog.loader';
import { PostService } from '../domain/post.service';
import {
  createPostInput,
  getPaginatedPostsPayload,
  getPaginatedPostsInput,
  deletePostPayload,
  editPostInput,
  createPostPayload,
  editPostPayload,
  PostParent,
} from './post.dto';
import { Post } from './post.graphql-model';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private blogLoader: BlogLoader,
  ) {}

  @ResolveField(() => User)
  async author(@Parent() post: PostParent) {
    return await this.blogLoader.users.load(post.authorId);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: PostParent) {
    return await this.blogLoader.commentsByPostIds.load(post.id);
  }

  @Query(() => Post, { name: 'Post', nullable: true })
  async getPost(@Args('id') id: string): Promise<PostParent> {
    return await this.blogLoader.posts.load(id);
  }

  @Query(() => getPaginatedPostsPayload, { name: 'paginatedPosts' })
  async getPaginatedPosts(
    @Args('getPaginatedPostsInput') { page, perPage }: getPaginatedPostsInput,
  ): Promise<getPaginatedPostsPayload> {
    const { posts, totalPages, totalEntities, isLastPage } =
      await this.postService.findPaginated(
        Math.max(page, 1),
        Math.max(perPage, 1),
      );

    return {
      posts,
      totalPages,
      totalEntities,
      isLastPage,
    };
  }

  @Mutation(() => createPostPayload)
  async createPost(
    @Args('createPostInput') createPostInput: createPostInput,
    @CurrentUser() { userId, userName }: userCredentials,
  ): Promise<createPostPayload> {
    const postId = await this.postService.createPost(createPostInput, userId);

    return {
      id: postId,
      title: createPostInput.title,
      body: createPostInput.body,
      authorNickname: userName,
      publishedAt: createPostInput.publishedAt || new Date(),
    };
  }

  @Mutation(() => editPostPayload)
  async editPost(
    @Args('editPostInput') editPostInput: editPostInput,
    @CurrentUser() user: userCredentials,
  ): Promise<editPostPayload> {
    await this.postService.editPost(editPostInput, user.userId);

    return {
      response: true,
    };
  }

  @Mutation(() => deletePostPayload)
  async deletePost(@Args('id') postId: string): Promise<deletePostPayload> {
    await this.postService.deletePost(postId);

    return {
      response: true,
    };
  }
}
