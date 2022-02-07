import { createCommentDTO, updateCommentDTO } from './comment.dto';
import Comment from './comment.entity';

export interface ICommentRepository {
  create(dto: createCommentDTO, authorNickname: string): Promise<Comment>;
  update(dto: updateCommentDTO): Promise<Comment>;
  remove(id: number): Promise<void>;
  findByIds(ids: number[]): Promise<Comment[]>;
}
