import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UserUpDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    shopName?: string;

    @IsOptional()
    @IsEnum(["seller", "client", "admin"], { message: "Role must be seller, client, or admin" })
    role?: "seller" | "client" | "admin";

    @IsOptional()
    regionId?: Types.ObjectId;

    @IsOptional()
    @IsString()
    location?: string;
}
