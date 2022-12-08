import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService], // Serviceを渡す
  controllers: [TasksController], // Controllerを渡す
})
export class TasksModule {}
