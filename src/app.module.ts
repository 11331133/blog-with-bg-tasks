import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/controllers/post.module';
import { UserModule } from './user/controllers/user.module';
import { CommentModule } from './comment/controllers/comment.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/auto-generated-schema.gql'),
      sortSchema: true,
    }),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      database: 'blog-with-bg-tasks',
      dialect: 'postgres',
      host: 'db',
      models: [],
      password: 'root',
      port: 5432,
      synchronize: true,
      username: 'root',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
