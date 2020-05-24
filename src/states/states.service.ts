import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map } from 'rxjs/operators';
import statesConfig from './config/states-config';

@Injectable()
export class StatesService {
  constructor(
    private http: HttpService,
    @Inject(statesConfig.KEY) private config: ConfigType<typeof statesConfig>,
  ) {}

  findAll() {
    return this.http.get(this.config.STATES_URI).pipe(map(res => res.data));
  }
}
