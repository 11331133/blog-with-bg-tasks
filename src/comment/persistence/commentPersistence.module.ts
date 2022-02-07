import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import CommentModel from './comment.model';
import { CommentRepository } from './comment.persistence';

@Module({
  imports: [SequelizeModule.forFeature([CommentModel])],
  providers: [CommentRepository],
  exports: [CommentRepository],
})
export class CommentPersistence {}
