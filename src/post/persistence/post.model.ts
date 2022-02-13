import {
  AllowNull,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import CommentModel from 'src/comment/persistence/comment.model';
import UserModel from 'src/user/persistence/user.model';

@Table
export default class PostModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  body: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column
  authorId: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;

  @HasMany(() => CommentModel)
  comments: CommentModel[]
}
