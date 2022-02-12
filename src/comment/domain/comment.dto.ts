export abstract class createCommentDTO {
  body: string;
  publishedAt?: Date;
}

export abstract class editCommentDTO {
  id: string;
  body: string;
}
