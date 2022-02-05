export default class Post {
  constructor(
    private _title: string,
    private _body: string,
    private _author: object,
    private _publishedAt: Date,
  ) {}

  public get title(): string {
    return this._title;
  }

  public get body(): string {
    return this._body;
  }

  public get author(): object {
    return this._author;
  }

  public get publishedAt(): Date {
    return this._publishedAt;
  }
}
