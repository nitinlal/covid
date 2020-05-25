import { Controller, Get, Param } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Get(':id')
  findOne(@Param('id') name) {
    return this.statesService.findByName(name);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }
}
