import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    shopName?: string;

    @IsNotEmpty()
    @IsEnum(["seller", "client", "admin"], { message: "Role must be seller, client, or admin" })
    role: "seller" | "client" | "admin";

    @IsNotEmpty()
    regionId: Types.ObjectId;

    @IsOptional()
    @IsString()
    location?: string;
}
