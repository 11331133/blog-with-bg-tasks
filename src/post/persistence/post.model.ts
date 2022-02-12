import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import UserModel from 'src/user/persistence/user.model';

@Table
export default class PostModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  body: string;

  @BelongsTo(() => UserModel)
  @AllowNull(false)
  @Column
  authorId: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;
}
