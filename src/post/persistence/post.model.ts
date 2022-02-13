import {
  AllowNull,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  HasMany,
  DataType,
  Index,
} from 'sequelize-typescript';
import CommentModel from 'src/comment/persistence/comment.model';
import UserModel from 'src/user/persistence/user.model';

@Table
export default class PostModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING(21))
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  body: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column(DataType.STRING(21))
  authorId: string;

  @Index
  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
