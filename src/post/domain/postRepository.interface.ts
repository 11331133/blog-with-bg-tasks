import { Paginated } from 'src/utils/paginated.type';
import {
  createPostDTO,
  findPostsByIdsDTO,
  removePostDTO,
  updatePostDTO,
} from './post.dto';
import Post from './post.entity';

export interface postRepository {
  create(dto: createPostDTO, authorNickname: string): Promise<number>;
  findByIds(dto: findPostsByIdsDTO): Promise<Post[]>;
  findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<Post, 'posts'>>;
  update(dto: updatePostDTO): Promise<Post>;
  remove(dto: removePostDTO): Promise<void>;
}
