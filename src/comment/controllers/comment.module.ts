import { forwardRef, Module } from '@nestjs/common';
import {PostModule} from 'src/post/controllers/post.module';
import { UserModule } from 'src/user/controllers/user.module';
import { BlogLoader } from 'src/utils/blog.loader';
import generateId from 'src/utils/GenerateId.adapter';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { CommentService } from '../domain/comment.service';
import { ICommentRepository } from '../domain/ICommentRepository';
import { CommentRepository } from '../persistence/comment.persistence';
import { CommentPersistence } from '../persistence/commentPersistence.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [UserModule, forwardRef(() => PostModule), CommentPersistence],
  providers: [
    CommentResolver,
    {
      provide: generateId,
      useValue: generateId,
    },
    {
      provide: CommentService,
      useFactory: (
        commentRepository: ICommentRepository,
        generateId: IGenerateId,
      ) => new CommentService(commentRepository, generateId),
      inject: [CommentRepository, generateId],
    },
    BlogLoader
  ],
  exports: [CommentService],
})
export class CommentModule {}
