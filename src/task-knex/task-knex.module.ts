import { Module } from '@nestjs/common';
import { TaskKnexController } from './task-knex.controller';
import { TaskKnexService } from './task-knex.service';

@Module({
  controllers: [TaskKnexController],
  providers: [TaskKnexService],
})
export class TaskKnexModule {}
