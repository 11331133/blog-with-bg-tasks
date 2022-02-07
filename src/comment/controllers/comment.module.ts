import { Module } from '@nestjs/common';
import { CommentService } from '../domain/comment.service';
import { ICommentRepository } from '../domain/commentRepository.interface';
import { CommentRepository } from '../persistence/comment.persistence';
import { CommentPersistence } from '../persistence/commentPersistence.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [CommentPersistence],
  providers: [
    CommentResolver,
    {
      provide: CommentService,
      useFactory: (commentRepository: ICommentRepository) =>
        new CommentService(commentRepository),
      inject: [CommentRepository],
    },
  ],
})
export class CommentModule {}
