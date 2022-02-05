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
export class PostModel extends Model {
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
  author: number;

  @AllowNull(false)
  @CreatedAt
  @Column
  publishedAt: Date;
}
