import { InjectModel } from '@nestjs/sequelize';
import CommentModel from './comment.model';
import CommentEntity from '../domain/comment.entity';
import { Injectable } from '@nestjs/common';
import { ICommentRepository } from '../domain/ICommentRepository';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(CommentModel) private commentModel: typeof CommentModel,
  ) {}

  async persist(comment: CommentEntity): Promise<void> {
    await this.commentModel.create(
      CommentMapper.mapToOrmEntityProperties(comment),
    );
  }

  async merge(comment: CommentEntity): Promise<void> {
    await this.commentModel.update(
      CommentMapper.mapToOrmEntityProperties(comment),
      { where: { id: comment.id } },
    );
  }

  async findByIds(ids: string[]): Promise<CommentEntity[]> {
    const commentModels = await this.commentModel.findAll({
      where: {
        id: ids,
      },
    });

    return commentModels.map(CommentMapper.mapToDomainEntity);
  }

  async findOne(id: string): Promise<CommentEntity> {
    return await this.findByIds([id]).then((comments) => comments.shift());
  }

  async findByPostId(id: string): Promise<CommentEntity[]> {
    const commentModels = await this.commentModel.findAll({
      where: {
        postId: id,
      },
    });

    return commentModels.map(CommentMapper.mapToDomainEntity)
  }

  async deleteOne(id: string): Promise<void> {
    await this.commentModel.destroy({
      where: {
        id,
      },
    });
  }
}
