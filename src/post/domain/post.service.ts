import { Paginated } from 'src/utils/paginated.type';
import { createPostDTO, updatePostDTO } from './post.dto';
import Post from './post.entity';
import { postRepository } from './postRepository.interface';

export class PostService {
  constructor(private readonly _postRepository: postRepository) {}

  public async create(
    { title, body, publishedAt = new Date() }: createPostDTO,
    authorNickname: string,
  ): Promise<Post> {
    return await this._postRepository.create(
      {
        title,
        body,
        publishedAt,
      },
      authorNickname,
    );
  }

  public async findByIds(ids: number[]): Promise<Post[]> {
    return await this._postRepository.findByIds(ids);
  }

  public async findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<Post, 'posts'>> {
    return await this._postRepository.findPaginated(pageNo, pageSize);
  }

  public async update(updatePostDTO: updatePostDTO): Promise<Post> {
    return await this._postRepository.update(updatePostDTO);
  }

  public async remove(id: number): Promise<void> {
    return await this._postRepository.remove(id);
  }
}
