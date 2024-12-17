import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getFilteredDto(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let allTasks = this.getAllTasks();
    if (search) {
      allTasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
          ? true
          : false,
      );
    }
    if (status) {
      allTasks = this.tasks.filter((task) => task.status === status);
    }
    return allTasks;
  }

  getIndividualTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateStatus(id: string, status: TaskStatus) {
    const task = this.getIndividualTask(id);
    task.status = status;
    return task;
  }
}
