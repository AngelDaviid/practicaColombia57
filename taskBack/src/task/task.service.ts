import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import { TaskS } from './schema/task.schema';
import { CreateTaskDto } from './dto/task.dto'
import { TaskUpdate } from "./dto/TaskUpdate.dto";

@Injectable()
export class TaskService {
        constructor(@InjectModel('TaskS') private taskModel: Model<TaskS>) {
        }

        findAll(){
            return this.taskModel.find().exec();
        }

        findOne(id:string){
            return this.taskModel.findById(id)
        }

        async create(task: CreateTaskDto) {
            const newTask = new this.taskModel(task);
            await newTask.save();
            return newTask;
        }


        async Update(id: string, taskUpdate: TaskUpdate) {
            const  updateTask = await this.taskModel.findByIdAndUpdate(id, taskUpdate, {new: true});
            if(!updateTask){
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            return updateTask;
        }

        delete(id: string) {
            return this.taskModel.findByIdAndDelete(id)
        }

}
