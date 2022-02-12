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
  @Column
  id: string;

  @AllowNull(false)
  @Column
  body: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column
  authorId: string;

  @ForeignKey(() => PostModel)
  // @BelongsTo(() => PostModel)
  @AllowNull(false)
  @Column
  postId: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;
}
