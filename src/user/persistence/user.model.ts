import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export default class UserModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Column
  nickname: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  passwordHash: string;
}
