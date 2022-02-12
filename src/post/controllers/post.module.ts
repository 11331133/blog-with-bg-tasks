import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/controllers/user.module';
import generateId from 'src/utils/GenerateId.adapter';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { IPostRepository } from '../domain/IPostRepository';
import { PostService } from '../domain/post.service';
import { PostRepository } from '../persistence/post.persistence';
import { PostPersistence } from '../persistence/postPersistence.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [UserModule, PostPersistence],
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
  ],
})
export class PostModule {}
