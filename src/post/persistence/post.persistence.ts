import { InjectModel } from '@nestjs/sequelize';
import { Paginated } from 'src/utils/paginated.type';
import PostModel from './post.model';
import PostEntity from '../domain/post.entity';
import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../domain/IPostRepository';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(@InjectModel(PostModel) private postModel: typeof PostModel) {}

  async persist(post: PostEntity): Promise<void> {
    await this.postModel.create(PostMapper.mapToOrmEntityProperties(post));
  }

  async merge(post: PostEntity): Promise<void> {
    await this.postModel.update(PostMapper.mapToOrmEntityProperties, {
      where: { id: post.id },
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.postModel.destroy({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: string[]): Promise<PostEntity[]> {
    const postModels = await this.postModel.findAll({
      where: {
        id: ids,
      },
    });

    return postModels.map(PostMapper.mapToDomainEntity);
  }

  async findOne(id: string): Promise<PostEntity> {
    return await this.findByIds([id]).then((posts) => posts.shift());
  }

  async findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<PostEntity, 'posts'>> {
    const { count: totalEntities, rows: postModels } =
      await this.postModel.findAndCountAll({
        order: ['publishedAt'],
        limit: pageSize,
        offset: (pageNo - 1) * pageSize,
      });

    return {
      totalPages: Math.floor(totalEntities / pageSize),
      totalEntities,
      posts: postModels.map(PostMapper.mapToDomainEntity),
    };
  }
}
