import { Module, HttpModule } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { StatesResolver } from './states.resolver';
import { ConfigModule } from '@nestjs/config';
import statesConfig from './config/states-config';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(statesConfig)],
  controllers: [StatesController],
  providers: [StatesService, StatesResolver],
})
export class StatesModule {}
