import {
  AllowNull,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export default class PostModel extends Model {
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

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
