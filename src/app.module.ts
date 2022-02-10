import { Module } from '@nestjs/common';
import { PostModule } from './post/controllers/post.module';
import { UserModule } from './user/controllers/user.module';
import { CommentModule } from './comment/controllers/comment.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/dist';

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
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        autoLoadModels: config.get<boolean>('DB_AUTOLOAD_MODELS'),
        database: config.get<string>('DB_DATABASENAME'),
        dialect: config.get<Dialect>('DB_DIALECT'),
        host: config.get<string>('DB_HOST'),
        password: config.get<string>('DB_PASSWORD'),
        port: config.get<number>('DB_PORT'),
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
        username: config.get<string>('DB_USERNAME'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
