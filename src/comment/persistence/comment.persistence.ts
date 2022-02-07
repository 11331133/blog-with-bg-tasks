import { InjectModel } from '@nestjs/sequelize';
import { createCommentDTO, updateCommentDTO } from '../domain/comment.dto';
import { ICommentRepository } from '../domain/commentRepository.interface';
import CommentModel from './comment.model';
import Comment from '../domain/comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(CommentModel) private commentModel: typeof CommentModel,
  ) {}

  async create(
    { body, publishedAt = Date.now() }: createCommentDTO,
    authorNickname: string,
  ): Promise<Comment> {
    const comment = new this.commentModel({
      authorId: 1,
      body,
      publishedAt: 1,
    });

    await comment.save();

    return new Comment({ id: comment.id, body, publishedAt });
  }

  async update({ id, body }: updateCommentDTO): Promise<Comment> {
    await this.commentModel.update({ body }, { where: { id } });

    return new Comment({ id, body, publishedAt: null });
  }

  async remove(id: number): Promise<void> {
    await this.commentModel.destroy({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: number[]): Promise<Comment[]> {
    const commentModels = await this.commentModel.findAll({
      where: {
        id: ids,
      },
    });

    return commentModels.map(
      (model) =>
        new Comment({
          id: model.id,
          body: model.body,
          publishedAt: model.publishedAt,
        }),
    );
  }
}
