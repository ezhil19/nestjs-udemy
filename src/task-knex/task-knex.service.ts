import { Injectable } from '@nestjs/common';
import { InjectConnection, Knex } from 'nestjs-knex';
import { TaskStatus } from 'src/tasks/task-status.enum';

@Injectable()
export class TaskKnexService {
  constructor(
    @InjectConnection('task_management')
    protected readonly taskManagementConnection: Knex,
  ) {}
  getTask() {
    return this.taskManagementConnection.select('*').from('task');
  }
  getTaskById(id: string) {
    return this.taskManagementConnection
      .select('*')
      .from('task')
      .where('id', id);
  }
  createTask(newTask: any) {
    const { title, description } = newTask;
    return this.taskManagementConnection('task')
      .insert({
        title: title,
        description: description,
        status: TaskStatus.IN_PROGRESS,
      })
      .into('task')
      .then(() => {
        return {
          message: 'Task created',
        };
      });
  }
}
