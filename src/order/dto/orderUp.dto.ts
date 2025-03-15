import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderUpDto {
    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @IsOptional()
    elonId: string;

    @IsString()
    @IsOptional()
    date: string;
}
