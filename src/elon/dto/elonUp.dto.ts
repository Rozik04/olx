import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from "class-validator";
import { Types } from "mongoose";
import { ProductType } from "../entity/elon.entity";

export class ProductUpDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    categoryId?: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    star?: number;

    @IsOptional()
    userId?: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    sale?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    garanty?: string;

    @IsOptional()
    @IsEnum(["ishlatilgan", "yangi"], { message: "Type must be 'ishlatilgan' or 'yangi'" })
    type?: ProductType;

    @IsOptional()
    @IsString()
    date?: string;
}
