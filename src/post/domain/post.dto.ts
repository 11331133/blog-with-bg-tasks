export abstract class createPostDTO {
  title: string;
  body: string;
  publishedAt?: number;
};

export abstract class updatePostDTO {
  id: number;
  title: string;
  body: string;
};
