import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  DataType,
  Index,
} from 'sequelize-typescript';
import PostModel from 'src/post/persistence/post.model';
import UserModel from 'src/user/persistence/user.model';

@Table
export default class CommentModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING(21))
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  body: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column(DataType.STRING(21))
  authorId: string;

  @Index
  @ForeignKey(() => PostModel)
  @AllowNull(false)
  @Column(DataType.STRING(21))
  postId: string;

  @Index
  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;

  @BelongsTo(() => PostModel)
  post: PostModel[];
}
