import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
})

export class TaskS extends Document {

    @Prop({})
    title: string;

    @Prop({})
    description: string;

    @Prop({ default: false })
    finished: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(TaskS);
