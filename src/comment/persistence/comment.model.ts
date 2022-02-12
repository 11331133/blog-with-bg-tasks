import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import PostModel from 'src/post/persistence/post.model';
import UserModel from 'src/user/persistence/user.model';

@Table
export default class CommentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  body: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column
  authorId: string;

  @BelongsTo(() => PostModel)
  @AllowNull(false)
  @Column
  postId: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: number;
}
