import { Query, Resolver } from '@nestjs/graphql';
import { StatsService } from './stats.service';

@Resolver('Stats')
export class StatsResolver {
  constructor(private serv: StatsService) {}

  @Query('stats')
  async stats() {
    return this.serv.findAll();
  }
}
