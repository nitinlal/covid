import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { StatsModule } from './stats/stats-module';

@Module({
  imports: [
    StatsModule,
    HttpModule,
    AuthorModule,
    GraphQLModule.forRoot({
      include: [StatsModule, AuthorModule],
      typePaths: ['./**/author.graphql'],
      definitions: {
        //TODO: nest generate definitions from AST ??
        path: join(process.cwd(), 'src/shared/graphql-types.ts'),
        outputAs: 'class', // output as class
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
