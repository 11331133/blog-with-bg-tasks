import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
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
