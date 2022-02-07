import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export default class CommentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  body: string;

  // @ForeignKey()
  @AllowNull(false)
  @Column
  authorId: number;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: number;
}
