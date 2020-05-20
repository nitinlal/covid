import { HttpModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import statconfig from './config/stats-config';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(statconfig)],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule implements OnModuleInit {
  onModuleInit() {}
}
