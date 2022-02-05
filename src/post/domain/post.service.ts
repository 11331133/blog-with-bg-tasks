import { createdPostDTO, createPostDTO } from './post.dto';
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

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
