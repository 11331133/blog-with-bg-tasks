import UserEntity from '../user/domain/user.entity';
import PostEntity from '../post/domain/post.entity';
import CommentEntity from '../comment/domain/comment.entity';
import { UserService } from '../user/domain/user.service';
import { PostService } from '../post/domain/post.service';
import { CommentService } from '../comment/domain/comment.service';
import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class BlogLoader {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  public readonly users = new DataLoader<string, UserEntity>(
    async (userIds: string[]) => {
      const users = await this.userService.findByIds(userIds);

      return BlogLoader.mapIdToEntity(userIds, users);
    },
  );

  public readonly posts = new DataLoader<string, PostEntity>(
    async (postIds: string[]) => {
      const posts = await this.postService.findByIds(postIds);

      return BlogLoader.mapIdToEntity(postIds, posts);
    },
  );

  public readonly comments = new DataLoader<string, CommentEntity>(
    async (commentIds: string[]) => {
      const comments = await this.commentService.findByIds(commentIds);

      return BlogLoader.mapIdToEntity(commentIds, comments);
    },
  );

  private static mapIdToEntity<T extends Record<'id', string>>(
    ids: string[],
    entities: T[],
  ): T[] {
    const map = new Map(entities.map((entity) => [entity.id, entity]));

    return ids.map((id) => map.get(id));
  }
}
