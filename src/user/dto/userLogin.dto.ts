import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class userLoginType{
   
   @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}