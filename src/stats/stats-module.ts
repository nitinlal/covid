import { HttpModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadAndValidate } from './config/stats-config';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(loadAndValidate)],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule implements OnModuleInit {
  onModuleInit() {}
}
