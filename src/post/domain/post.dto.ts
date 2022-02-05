export type createPostDTO = {
  title: string;
  body: string;
  publishedAt?: Date;
};

export type updatePostDTO = {
  id: number;
  title: string;
  body: string;
};
