import { Paginated } from 'src/utils/paginated.type';
import { createPostDTO, updatePostDTO } from './post.dto';
import Post from './post.entity';

export interface postRepository {
  create(dto: createPostDTO, authorNickname: string): Promise<Post>;
  update(dto: updatePostDTO): Promise<Post>;
  remove(id: number): Promise<void>;
  findByIds(ids: number[]): Promise<Post[]>;
  findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<Post, 'posts'>>;
}
