import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CommentModel from 'src/comment/persistence/comment.model';
import PostModel from 'src/post/persistence/post.model';

@Table
export default class UserModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING(21))
  id: string;

  @AllowNull(false)
  @Column
  nickname: string;

  @Index
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  passwordHash: string;

  @HasMany(() => PostModel)
  writtenPosts: PostModel[];

  @HasMany(() => CommentModel)
  writtenComments: CommentModel[];
}
