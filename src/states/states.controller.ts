import { Controller, Get } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Get()
  findAll() {
    return this.statesService.findAll();
  }
}
