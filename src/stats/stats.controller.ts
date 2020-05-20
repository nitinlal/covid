import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StatsDto } from './stats-dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statService: StatsService) {}

  @Get()
  findAll(): Observable<StatsDto> {
    return this.statService.findAll();
  }
}
