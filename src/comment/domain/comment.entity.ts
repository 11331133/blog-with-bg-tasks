export default class Comment {
  private readonly _id: number;
  private readonly _body: string;
  private readonly _publishedAt: number;

  constructor({
    id,
    body,
    publishedAt,
  }: {
    id: number;
    body: string;
    publishedAt: number;
  }) {
    this._id = id;
    this._body = body;
    this._publishedAt = publishedAt;
  }

  public get id(): number {
    return this._id;
  }

  public get body(): string {
    return this._body;
  }

  public get publishedAt(): number {
    return this._publishedAt;
  }
}
