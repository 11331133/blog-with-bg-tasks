import PostEntity from '../domain/post.entity';
import PostModel from './post.model';

export class PostMapper {
  public static mapToOrmEntityProperties(domainEntity: PostEntity) {
    return {
      id: domainEntity.id,
      title: domainEntity.title,
      body: domainEntity.body,
      authorId: domainEntity.authorId,
      publishedAt: domainEntity.publishedAt,
    };
  }

  public static mapToDomainEntity(ormEntity: PostModel) {
    return new PostEntity({
      id: ormEntity.id,
      title: ormEntity.title,
      body: ormEntity.body,
      authorId: ormEntity.authorId,
      publishedAt: ormEntity.publishedAt,
    });
  }
}
