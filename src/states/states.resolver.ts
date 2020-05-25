import { Resolver, Query, Args } from '@nestjs/graphql';
import { StatesService } from './states.service';

@Resolver('States')
export class StatesResolver {
  constructor(private service: StatesService) {}

  @Query('states')
  getStates(@Args('name') name: string) {
    console.log('calling states !!!');
    return this.service.findByName(name);
  }
}
