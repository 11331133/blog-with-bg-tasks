export abstract class createCommentDTO {
  body: string;
  publishedAt?: number;
}

export abstract class updateCommentDTO {
  id: number;
  body: string;
}
