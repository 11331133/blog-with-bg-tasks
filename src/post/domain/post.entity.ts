export default class PostEntity {
  constructor(
    private _id: number,
    private _title: string,
    private _body: string,
    private _authorNickname: string,
    private _publishedAt: number,
  ) {}

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get body(): string {
    return this._body;
  }

  public get authorNickname(): string {
    return this._authorNickname;
  }

  public get publishedAt(): number {
    return this._publishedAt;
  }
}
