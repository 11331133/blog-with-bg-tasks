import CommentEntity from '../domain/comment.entity';
import CommentModel from './comment.model';

export class CommentMapper {
  public static mapToOrmEntityProperties(domainEntity: CommentEntity) {
    return {
      id: domainEntity.id,
      body: domainEntity.body,
      authorId: domainEntity.authorId,
      publishedAt: domainEntity.publishedAt,
    };
  }

  public static mapToDomainEntity(ormEntity: CommentModel) {
    return new CommentEntity({
      id: ormEntity.id,
      body: ormEntity.body,
      authorId: ormEntity.authorId,
      publishedAt: ormEntity.publishedAt,
    });
  }
}
