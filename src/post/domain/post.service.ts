import { Paginated } from 'src/utils/paginated.type';
import { createPostDTO, updatePostDTO } from './post.dto';
import PostEntity from './post.entity';
import { IPostRepository } from './postRepository.interface';

export class PostService {
  constructor(private readonly _postRepository: IPostRepository) {}

  public async create(
    { title, body, publishedAt = Date.now() }: createPostDTO,
    authorNickname: string,
  ): Promise<PostEntity> {
    return await this._postRepository.create(
      {
        title,
        body,
        publishedAt,
      },
      authorNickname,
    );
  }

  public async findByIds(ids: number[]): Promise<PostEntity[]> {
    return await this._postRepository.findByIds(ids);
  }

  public async findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<PostEntity, 'posts'>> {
    return await this._postRepository.findPaginated(
      Math.max(pageNo, 0),
      Math.max(pageSize, 1),
    );
  }

  public async update(updatePostDTO: updatePostDTO): Promise<PostEntity> {
    return await this._postRepository.update(updatePostDTO);
  }

  public async remove(id: number): Promise<void> {
    return await this._postRepository.remove(id);
  }
}
