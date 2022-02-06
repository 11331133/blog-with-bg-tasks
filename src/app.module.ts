import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/auto-generated-schema.gql'),
    }),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      database: 'test',
      dialect: 'postgres',
      host: 'localhost',
      models: [],
      password: 'root',
      port: 3306,
      synchronize: true,
      username: 'root',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
