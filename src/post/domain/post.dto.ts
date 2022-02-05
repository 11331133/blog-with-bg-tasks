import Post from "./post.entity";

export type createPostDTO = {
    title: Pick<Post, "title">,
    body: Pick<Post, "body">,
    publishedAt?: Date,
};

export type createdPostDTO = {
    id: number,
    title: Pick<Post, "title">,
    body: Pick<Post, "body">,
    publishedAt: Date,
    authorNickname: string, 
}

