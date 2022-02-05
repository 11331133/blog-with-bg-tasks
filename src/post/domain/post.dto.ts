import Post from "./post.entity";

export type createPostDTO = {
    title: Pick<Post, "title">,
    body: Pick<Post, "body">,
    publishedAt?: Pick<Post, "publishedAt">
};
