import * as _ from 'lodash';
import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import UserEntity from '../user/domain/user.entity';
import PostEntity from '../post/domain/post.entity';
import CommentEntity from '../comment/domain/comment.entity';
import { UserService } from '../user/domain/user.service';
import { PostService } from '../post/domain/post.service';
import { CommentService } from '../comment/domain/comment.service';

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

      return this.mapIdsToEntities(userIds, users);
    },
  );

  public readonly posts = new DataLoader<string, PostEntity>(
    async (postIds: string[]) => {
      const posts = await this.postService.findByIds(postIds);

      return this.mapIdsToEntities(postIds, posts);
    },
  );

  public readonly commentsByPostIds = new DataLoader<string, CommentEntity[]>(
    async (postIds: string[]) => {
      const comments = await this.commentService.findByPostIds(postIds);

      return this.mapIdsToEntityGroups(
        postIds,
        comments,
        (comment: CommentEntity) => comment.postId,
      );
    },
  );

  private mapIdsToEntities<T extends Record<'id', string>>(
    ids: string[],
    entities: T[],
  ): T[] {
    const map = _.keyBy(entities, (entity) => entity.id);

    return ids.map((id) => map[id]);
  }

  private mapIdsToEntityGroups<T>(
    ids: string[],
    entities: T[],
    groupIdGetter: (entity: T) => string,
  ): T[][] {
    const map = _.groupBy(entities, groupIdGetter);

    return ids.map((id) => map[id] || []);
  }
}
