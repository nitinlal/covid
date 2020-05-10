import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { StatsModule } from './stats/stats-module';

@Module({
  imports: [StatsModule, HttpModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
