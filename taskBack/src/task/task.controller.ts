import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put} from '@nestjs/common';
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/task.dto";
import { TaskUpdate } from "./dto/TaskUpdate.dto";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(){
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const task = await this.taskService.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;

    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        return  this.taskService.create(body);
    }

    @Put(':id')
    async taskUpdate(@Param('id') id:string, @Body() body: TaskUpdate) {
        const update = await this.taskService.Update(id, body);
        if(!update){
            throw new NotFoundException("Task not found");
        }
        return update;
    }

    @Delete(':id')
    async taskDelete(@Param('id') id:string) {
        const task = await this.taskService.delete(id);
        if(!task){
            throw new NotFoundException("Task not found");
        }
        return task;
    }

    @Patch(':id')
    async finishTask(@Param('id') id:string, @Body() update: { finished: boolean }) {
        return this.taskService.markAsFinished(id, update)
    }


}
