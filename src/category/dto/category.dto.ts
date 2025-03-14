import { IsNotEmpty, IsString } from "class-validator";

export class categoryDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    image:string
}