import { Paginated } from 'src/utils/paginated.type';
import { IPostRepository } from './IPostRepository';
import { createPostDTO, editPostDTO } from './post.dto';
import PostEntity from './post.entity';
import { IGenerateId } from 'src/utils/IGenerateId.interface';

export class PostService {
  constructor(
    private readonly _postRepository: IPostRepository,
    private readonly _generateId: IGenerateId,
  ) {}

  public async createPost(dto: createPostDTO, userId: string): Promise<string> {
    const id = await this._generateId();
    const post = new PostEntity({
      id, 
      title: dto.title,
      body: dto.body,
      authorId: userId,
      publishedAt: dto.publishedAt || new Date(),
    });

    await this._postRepository.persist(post);
    return id;
  }

  public async editPost(editPostDTO: editPostDTO, userId: string): Promise<void> {
    const post = await this._postRepository.findOne(editPostDTO.id);
    // if (post.authorId !== userId) {
        // if user is not an author, set 'Edited By' field value separately
        // & other business logic
    // }

    const editedPost = new PostEntity({
        id: editPostDTO.id,
        title: editPostDTO.title || post.title,
        body: editPostDTO.body || post.body,
        publishedAt: post.publishedAt,
        authorId: post.authorId
    })

    await this._postRepository.merge(editedPost);
  }

  public async removePost(id: string): Promise<void> {
    return await this._postRepository.deleteOne(id);
  }

  public async findByIds(ids: string[]): Promise<PostEntity[]> {
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

}
