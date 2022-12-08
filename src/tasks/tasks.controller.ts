import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  // ControllerへTasksServiceを注入することでTasksControllerはTasksServiceのメソッドを自由に使える
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id)
  }
}
