import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class commentUpDto{
    @IsString()
    @IsOptional()
    userId:string
    // @IsString()
    // @IsOptional()
    // elonId:string
    @IsString()
    @IsOptional()
    msg:string
}