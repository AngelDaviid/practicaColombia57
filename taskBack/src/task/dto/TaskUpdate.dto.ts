import { IsString, IsBoolean, IsOptional } from "class-validator";

export class TaskUpdate {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    finished?: boolean;
}