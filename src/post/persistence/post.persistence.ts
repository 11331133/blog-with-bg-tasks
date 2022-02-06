import { InjectModel } from '@nestjs/sequelize';
import { Paginated } from 'src/utils/paginated.type';
import { createPostDTO, updatePostDTO } from '../domain/post.dto';
import { IPostRepository } from '../domain/postRepository.interface';
import PostModel from './post.model';
import Post from '../domain/post.entity';

export class PostRepository implements IPostRepository {
  constructor(@InjectModel(PostModel) private postModel: typeof PostModel) {}

  async create(
    { title, body, publishedAt = Date.now() }: createPostDTO,
    authorNickname: string,
  ): Promise<Post> {
    const post = new this.postModel({
      title,
      body,
      publishedAt,
    });

    await post.save();

    return new Post(post.id, title, body, authorNickname, publishedAt);
  }

  async update({ id, title, body }: updatePostDTO): Promise<Post> {
    const post = new this.postModel({ id });
    if (title) post.title = title;
    if (body) post.body = body;

    await post.save();

    return new Post(post.id, title, body, null, post.publishedAt);
  }

  async remove(id: number): Promise<void> {
    await this.postModel.destroy({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: number[]): Promise<Post[]> {
    const postModels = await this.postModel.findAll({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return postModels.map(
      (model) =>
        new Post(model.id, model.title, model.body, null, model.publishedAt),
    );
  }

  async findPaginated(
    pageNo: number,
    pageSize: number,
  ): Promise<Paginated<Post, 'posts'>> {
    const { count: totalEntities, rows: postModels } =
      await this.postModel.findAndCountAll({
        order: ['publishedAt', 'desc'],
        limit: pageSize,
        offset: (pageNo - 1) * pageSize,
      });

    return {
      totalPages: Math.floor(totalEntities / pageSize),
      totalEntities,
      posts: postModels.map(
        (model) =>
          new Post(model.id, model.title, model.body, null, model.publishedAt),
      ),
    };
  }
}
