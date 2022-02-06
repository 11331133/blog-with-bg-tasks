import { Module } from '@nestjs/common';
import { PostService } from '../domain/post.service';
import { IPostRepository } from '../domain/postRepository.interface';
import { PostRepository } from '../persistence/post.persistence';
import { PostPersistence } from '../persistence/postPersistence.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [PostPersistence],
  providers: [
    PostResolver,
    {
      provide: PostService,
      useFactory: (postRepository: IPostRepository) =>
        new PostService(postRepository),
      inject: [PostRepository],
    },
  ],
})
export class PostModule {}
