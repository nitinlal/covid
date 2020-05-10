import { Injectable } from '@nestjs/common';
import { Author } from '../graphql';

@Injectable()
export class AuthorService {
  findOneById(id: number): Author {
    return {
      id: 1,
    };
  }
}
