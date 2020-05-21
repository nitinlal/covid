import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { StatsModule } from './stats/stats-module';
import { StatesModule } from './states/states.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app-config';

@Module({
  imports: [
    StatsModule,
    HttpModule,
    AuthorModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    GraphQLModule.forRoot({
      include: [StatsModule, AuthorModule],
      typePaths: ['./**/author.graphql'],
      definitions: {
        //TODO: nest generate definitions from AST ??
        path: join(process.cwd(), 'src/shared/graphql-types.ts'),
        outputAs: 'class', // output as class
      },
    }),
    StatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
