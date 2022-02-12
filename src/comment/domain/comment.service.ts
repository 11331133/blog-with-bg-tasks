import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { createCommentDTO, editCommentDTO } from './comment.dto';
import CommentEntity from './comment.entity';
import { ICommentRepository } from './ICommentRepository';

export class CommentService {
  constructor(
    private readonly _commentRepository: ICommentRepository,
    private readonly _generateId: IGenerateId,
  ) {}

  public async createComment(
    dto: createCommentDTO,
    userId: string,
  ): Promise<string> {
    const commentId = await this._generateId();

    const comment = new CommentEntity({
      id: commentId,
      body: dto.body,
      publishedAt: dto.publishedAt || new Date(),
      authorId: userId,
    });

    await this._commentRepository.persist(comment);
    return commentId;
  }

  public async editComment(
    editCommentDTO: editCommentDTO,
    userId: string,
  ): Promise<void> {
    const comment = await this._commentRepository.findOne(editCommentDTO.id);
    // if (comment.authorId !== userId) {
    // if user is not an author, check user's role
    // & other business logic
    // }

    const editedComment = new CommentEntity({
      id: editCommentDTO.id,
      body: editCommentDTO.body,
      authorId: comment.authorId,
      publishedAt: comment.publishedAt,
    });

    await this._commentRepository.merge(editedComment);
  }

  public async findByIds(ids: string[]): Promise<CommentEntity[]> {
    return await this._commentRepository.findByIds(ids);
  }

  public async findOne(id: string): Promise<CommentEntity> {
    return await this._commentRepository.findOne(id);
  }

  public async deleteComment(id: string): Promise<void> {
    return await this._commentRepository.deleteOne(id);
  }
}
