export abstract class createPostDTO {
  title: string;
  body: string;
  publishedAt?: Date;
}

export abstract class editPostDTO {
  id: string;
  title: string;
  body: string;
}
