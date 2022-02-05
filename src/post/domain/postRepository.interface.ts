import { createPostDTO, findPostsByIdsDTO, updatePostDTO } from './post.dto';
import Post from './post.entity';

export interface postRepository {
  create(dto: createPostDTO, authorNickname: string): Promise<number>;
  findByIds(dto: findPostsByIdsDTO): Promise<Post[]>;
  update(dto: updatePostDTO): Promise<Post>;
}
