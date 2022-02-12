export default class PostEntity {
  private _id: string;
  private _title: string;
  private _body: string;
  private _authorId: string;
  private _publishedAt: Date;

  constructor({
    id,
    title,
    body,
    authorId,
    publishedAt,
  }: {
    id: string;
    title: string;
    body: string;
    authorId: string;
    publishedAt: Date;
  }) {
    this._id = id;
    this._title = title;
    this._body = body;
    this._authorId = authorId;
    this._publishedAt = publishedAt;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get body(): string {
    return this._body;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get publishedAt(): Date {
    return this._publishedAt;
  }
}
