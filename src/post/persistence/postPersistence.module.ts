import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import PostModel from './post.model';
import {PostRepository} from './post.persistence';

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  providers: [PostRepository]
})
export class PostPersistence {}
