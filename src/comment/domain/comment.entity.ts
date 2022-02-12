export default class CommentEntity {
  private readonly _id: string;
  private readonly _body: string;
  private readonly _authorId: string;
  private readonly _publishedAt: Date;
  private readonly _postId: string;

  constructor({
    id,
    body,
    authorId,
    publishedAt,
    postId,
  }: {
    id: string;
    body: string;
    authorId: string;
    publishedAt: Date;
    postId: string;
  }) {
    this._id = id;
    this._body = body;
    this._publishedAt = publishedAt;
    this._authorId = authorId;
    this._postId = postId;
  }

  public get id(): string {
    return this._id;
  }

  public get body(): string {
    return this._body;
  }

  public get publishedAt(): Date {
    return this._publishedAt;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get postId(): string {
    return this._postId;
  }
}
