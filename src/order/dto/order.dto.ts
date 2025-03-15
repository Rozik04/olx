import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    elonId: string;

    @IsString()
    @IsOptional()
    date?: string;
}
