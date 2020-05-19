import { Injectable } from '@nestjs/common';
import { Post } from '../graphql';

@Injectable()
export class PostService {
  findAll(arg0: { authorId: any }): Post[] {
    return [
      {
        id: arg0.authorId,
        title: 'test',
      },
    ];
  }
}
