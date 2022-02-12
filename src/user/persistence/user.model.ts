import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export default class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @AllowNull(false)
  @Column
  nickname: string;

  @AllowNull(false)
  @Column
  email: string;
}
