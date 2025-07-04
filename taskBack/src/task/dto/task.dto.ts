import {IsString, IsBoolean, IsNotEmpty, IsOptional} from 'class-validator'

export class CreateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    finished: boolean;

}