import { forwardRef, Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/controllers/comment.module';
import { UserModule } from 'src/user/controllers/user.module';
import { BlogLoader } from 'src/utils/blog.loader';
import generateId from 'src/utils/GenerateId.adapter';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { IPostRepository } from '../domain/IPostRepository';
import { PostService } from '../domain/post.service';
import { PostRepository } from '../persistence/post.persistence';
import { PostPersistence } from '../persistence/postPersistence.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [UserModule, CommentModule, PostPersistence],
  providers: [
    PostResolver,
    {
      provide: generateId,
      useValue: generateId,
    },
    {
      provide: PostService,
      useFactory: (postRepository: IPostRepository, generateId: IGenerateId) =>
        new PostService(postRepository, generateId),
      inject: [PostRepository, generateId],
    },
    BlogLoader,
  ],
  exports: [PostService]
})
export class PostModule {}
