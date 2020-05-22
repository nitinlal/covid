import { HttpModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import statconfig from './config/stats-config';
import { StatsResolver } from './stats.resolver';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(statconfig)],
  controllers: [StatsController],
  providers: [StatsService, StatsResolver],
})
export class StatsModule implements OnModuleInit {
  // LifeCycle hooks
  onModuleInit() {}
}
