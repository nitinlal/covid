import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { PostService } from '../post/post.service';
import { Author } from '../graphql';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorService,
    private postsService: PostService,
  ) {}

  @Query('author')
  async getAuthor(@Args('id') id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts')
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}

