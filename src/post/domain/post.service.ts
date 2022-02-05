import {
  createdPostDTO,
  createPostDTO,
  findPostsByIdsDTO,
  updatePostDTO,
} from './post.dto';
import Post from './post.entity';
import { postRepository } from './postRepository.interface';

export class PostService {
  constructor(private readonly _postRepository: postRepository) {}

  public async create(
    { title, body, publishedAt = new Date() }: createPostDTO,
    authorNickname: string,
  ): Promise<createdPostDTO> {
    const postId = await this._postRepository.create(
      {
        title,
        body,
        publishedAt,
      },
      authorNickname,
    );

    return {
      id: postId,
      title,
      body,
      publishedAt,
      authorNickname,
    };
  }

  public async findByIds(ids: findPostsByIdsDTO): Promise<Post[]> {
    return await this._postRepository.findByIds(ids);
  }

  public async update(updatePostDTO: updatePostDTO) {
    return await this._postRepository.update(updatePostDTO);
  }

  public async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
