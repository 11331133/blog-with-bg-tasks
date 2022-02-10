import { Paginated } from 'src/utils/paginated.type';
import { createPostDTO, updatePostDTO } from './post.dto';
import PostEntity from './post.entity';

export interface IPostRepository {
  create(dto: createPostDTO, authorNickname: string): Promise<PostEntity>;
  update(dto: updatePostDTO): Promise<PostEntity>;
  remove(id: number): Promise<void>;
  findByIds(ids: number[]): Promise<PostEntity[]>;
  findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<PostEntity, 'posts'>>;
}
