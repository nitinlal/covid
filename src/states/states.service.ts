import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map } from 'rxjs/operators';
import statesConfig from './config/states-config';
import { StatesDTO } from './states.dto';

@Injectable()
export class StatesService {
  constructor(
    private http: HttpService,
    @Inject(statesConfig.KEY) private config: ConfigType<typeof statesConfig>,
  ) {}

  findAll() {
    return this.http
      .get<StatesDTO>(this.config.STATES_URI)
      .pipe(map(res => res.data));
  }

  findByName(name: string) {
    console.log('service called with name', { name });
    return this.http.get<StatesDTO>(this.config.STATES_URI).pipe(
      map(res => {
        const response = res.data.find(d => {
          return d.state === name;
        });
        console.log('found state', name, response);
        return response;
      }),
    );
  }
}
