import { createCommentDTO, updateCommentDTO } from './comment.dto';
import CommentEntity from './comment.entity';

export interface ICommentRepository {
  create(dto: createCommentDTO, authorNickname: string): Promise<CommentEntity>;
  update(dto: updateCommentDTO): Promise<CommentEntity>;
  remove(id: number): Promise<void>;
  findByIds(ids: number[]): Promise<CommentEntity[]>;
}
