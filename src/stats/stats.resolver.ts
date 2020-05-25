import { Query, Resolver } from '@nestjs/graphql';
import { StatsService } from './stats.service';

@Resolver('Stats')
export class StatsResolver {
  constructor(private serv: StatsService) {}

  @Query('stats')
  async stats() {
    console.log('calling stats');
    return this.serv.findAll();
  }
}
