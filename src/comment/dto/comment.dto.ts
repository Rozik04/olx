import { IsNotEmpty, IsString } from "class-validator";

export class commentDto{
    @IsString()
    @IsNotEmpty()
    userId:string
    // @IsString()
    // @IsNotEmpty()
    // elonId:string
    @IsString()
    @IsNotEmpty()
    msg:string
}