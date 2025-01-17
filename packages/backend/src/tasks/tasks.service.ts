import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
        },
      });

      return {
        isSuccess: true,
        data: newTask,
      };
    } catch (err) {
      console.log('TasksService.create.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }

  async findAll(filters: { name?: string }) {
    try {
      const dbTasks = await this.prisma.task.findMany({
        where: {
          name: {
            contains: filters.name,
          },
        },
      });

      return {
        isSuccess: true,
        data: dbTasks,
      };
    } catch (err) {
      console.log('TasksService.findAll.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }

  async findOne(id: string) {
    try {
      const dbTask = await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

      return {
        isSuccess: true,
        data: dbTask,
      };
    } catch (err) {
      console.log('TasksService.findOne.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.prisma.task.update({
        data: {
          name: updateTaskDto.name,
        },
        where: {
          id,
        },
      });

      return {
        isSuccess: true,
      };
    } catch (err) {
      console.log('TasksService.update.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }

  async done(id: string) {
    try {
      await this.prisma.task.update({
        data: {
          isDone: true,
        },
        where: {
          id,
        },
      });

      return {
        isSuccess: true,
      };
    } catch (err) {
      console.log('TasksService.done.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({
        where: {
          id,
        },
      });

      return {
        isSuccess: true,
      };
    } catch (err) {
      console.log('TasksService.remove.err: ', err);
      return {
        isSuccess: false,
        error: 'Unexpected error',
      };
    }
  }
}
