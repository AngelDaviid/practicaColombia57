import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskS, TaskSchema } from "./schema/task.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskS.name, schema: TaskSchema }])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
