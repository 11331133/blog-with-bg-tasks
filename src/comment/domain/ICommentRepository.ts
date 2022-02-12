import IBaseRepository from 'src/utils/IBaseRepository.interface';
import CommentEntity from './comment.entity';

export interface ICommentRepository extends IBaseRepository<CommentEntity> {}
