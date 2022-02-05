import Post from './post.entity';

export type createPostDTO = {
  title: string;
  body: string;
  publishedAt?: Date;
};

export type updatePostDTO = {
  id: number;
  title: Pick<Post, 'title'>;
  body: Pick<Post, 'title'>;
};
