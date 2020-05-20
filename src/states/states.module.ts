import { Module, HttpModule } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { StatesResolver } from './states.resolver';

@Module({
  imports: [HttpModule],
  controllers: [StatesController],
  providers: [StatesService, StatesResolver]
})
export class StatesModule {}
