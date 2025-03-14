import { IsNotEmpty, IsString } from "class-validator";

export class regionDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}