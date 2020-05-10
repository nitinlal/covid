import { Injectable, HttpService } from '@nestjs/common';
import { StatsDto } from './stats-dto';
import { map } from 'rxjs/operators';

@Injectable()
export class StatsService {
  constructor(private http: HttpService) {}

  findAll() {
    return this.http
      .get<StatsDto>(
        `https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats
        `,
      )
      .pipe(map(res => res.data));
  }
}
