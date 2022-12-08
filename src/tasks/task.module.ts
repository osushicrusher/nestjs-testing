import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [], // Serviceを渡す
  controllers: [], // Controllerを渡す
})
export class TaskModule {}
