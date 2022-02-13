import { Paginated } from 'src/utils/paginated.type';
import PostEntity from './post.entity';
import IBaseRepository from 'src/utils/IBaseRepository.interface';

export interface IPostRepository extends IBaseRepository<PostEntity> {
  findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<{ posts: PostEntity[]; totalEntities: number }>;
}
