import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository, // Ensure this matches your repository class
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id as any);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(
      'this.tasksRepository',
      this.tasksRepository.createTask(createTaskDto),
    );
    // return this.tasksRepository.createTask(createTaskDto);
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id as string);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
