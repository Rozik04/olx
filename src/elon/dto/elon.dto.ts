import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from "class-validator";
import { Types } from "mongoose";
import { ProductType } from "../entity/elon.entity";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    categoryId: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    star?: number;

    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    sale?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    garanty?: string;

    @IsNotEmpty()
    @IsEnum(["ishlatilgan", "yangi"], { message: "Type must be 'ishlatilgan' or 'yangi'" })
    type: ProductType;

    @IsOptional()
    @IsString()
    date?: string;
}
