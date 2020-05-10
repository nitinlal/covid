import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorController } from './author.controller';
import { AuthorsResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { PostModule } from '../post/post.module';
import { PostService } from '../post/post.service';

@Module({
  imports: [
    PostModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/author.graphql'],
      definitions: {   //TODO: nest generate definitions from AST ??
        path: join(process.cwd(), 'src/author/graphql.ts'),
        outputAs: 'class', // output as class
      },
    }),
  ],
  providers: [AuthorService, AuthorsResolver],
  controllers: [AuthorController]
})
export class AuthorModule {}
