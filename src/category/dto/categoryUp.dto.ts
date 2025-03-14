import {IsOptional, IsString } from "class-validator";

export class categoryUpDto{
    @IsString()
    @IsOptional()
    name:string

    @IsString()
    @IsOptional()
    image:string
}