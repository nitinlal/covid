import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import statesConfig from './config/states-config';
import { StatesController } from './states.controller';
import { StatesResolver } from './states.resolver';
import { StatesService } from './states.service';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(statesConfig)],
  controllers: [StatesController],
  providers: [StatesService, StatesResolver],
})
export class StatesModule {}
