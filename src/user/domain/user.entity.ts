export default class User {
  private readonly _id: number;
  private readonly _nickname: string;
  private readonly _email: string;

  constructor({
    id,
    nickname,
    email,
  }: {
    id: number;
    nickname: string;
    email: string;
  }) {
    this._id = id;
    this._nickname = nickname;
    this._email = email;
  }

  public get id(): number {
    return this._id;
  }

  public get nickname(): string {
    return this._nickname;
  }

  public get email(): string {
    return this._email;
  }
}
