export default class UserEntity {
  private readonly _id: string;
  private readonly _nickname: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor({
    id,
    nickname,
    email,
    password,
  }: {
    id: string;
    nickname: string;
    email: string;
    password?: string;
  }) {
    this._id = id;
    this._nickname = nickname;
    this._email = email;
    this._password = password;
  }

  public get id(): string {
    return this._id;
  }

  public get nickname(): string {
    return this._nickname;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}
