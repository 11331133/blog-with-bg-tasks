import {createPostDTO} from "./post.dto";

export interface postRepository {
    create(dto: createPostDTO, authorNickname: string): Promise<number);
}
