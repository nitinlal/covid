import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map } from 'rxjs/operators';
import statconfig from './config/stats-config';
import { StatsDto } from './stats-dto';
import { Observable } from 'rxjs';

@Injectable()
export class StatsService {
  constructor(
    private http: HttpService,
    @Inject(statconfig.KEY) private config: ConfigType<typeof statconfig>,
  ) {}

  findAll(): Observable<StatsDto> {
    return this.http
      .get<StatsDto>(this.config.STATS_URI)
      .pipe(map(res => res.data));
  }
}
