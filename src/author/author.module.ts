import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { AuthorController } from './author.controller';
import { AuthorsResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    PostModule,
  ],
  providers: [AuthorService, AuthorsResolver],
  controllers: [AuthorController]
})
export class AuthorModule {}
