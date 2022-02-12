import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
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
  // @BelongsTo(() => UserModel)
  @AllowNull(false)
  @Column
  authorId: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;
}
