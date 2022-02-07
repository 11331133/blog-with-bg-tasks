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
export default class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  nickname: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  passwordHash: string;
}
