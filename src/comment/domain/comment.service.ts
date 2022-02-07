import { createCommentDTO, updateCommentDTO } from './comment.dto';
import Comment from './comment.entity';
import { ICommentRepository } from './commentRepository.interface';

export class CommentService {
  constructor(private readonly _commentRepository: ICommentRepository) {}

  public async create(
    { body, publishedAt = Date.now() }: createCommentDTO,
    authorNickname: string,
  ): Promise<Comment> {
    return await this._commentRepository.create(
      {
        body,
        publishedAt,
      },
      authorNickname,
    );
  }

  public async findByIds(ids: number[]): Promise<Comment[]> {
    return await this._commentRepository.findByIds(ids);
  }

  public async update(updateCommentDTO: updateCommentDTO): Promise<Comment> {
    return await this._commentRepository.update(updateCommentDTO);
  }

  public async remove(id: number): Promise<void> {
    return await this._commentRepository.remove(id);
  }
}
