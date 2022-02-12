export abstract class createCommentDTO {
  body: string;
  publishedAt?: Date;
  postId: string;
}

export abstract class editCommentDTO {
  id: string;
  body: string;
}
