import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskKnexService } from './task-knex.service';

@Controller('task-knex')
export class TaskKnexController {
  constructor(private taskKnexService: TaskKnexService) {}
  @Get()
  getTasks() {
    return this.taskKnexService.getTask();
  }
  @Get('/:id')
  getTaskById(@Param(':id') params: any) {
    return this.taskKnexService.getTaskById(params.id);
  }
  @Post()
  createTask(@Body() params: any) {
    const task = this.taskKnexService.createTask(params);
    return task;
  }
}
