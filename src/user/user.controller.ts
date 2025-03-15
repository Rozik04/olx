import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {  multerCon } from 'src/multer';
import { UserDto } from 'src/user/dto/user.dto';
import { userLoginType } from 'src/user/dto/userLogin.dto';
import { UserUpDto } from 'src/user/dto/userUp.dto';
import { JwtAuthGuard } from 'src/auth.guard';
import * as fs from "fs/promises"
import { join } from 'path';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id:string){
        return this.userService.findOne(id)
    }

    @Post("upload-image")
    @UseInterceptors(FileInterceptor("image", multerCon))
    uploadFile(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
    throw new BadRequestException("No file uploaded");
    }
    return { filename: image.filename };
    }

    @Post("register")
    register(@Body(new ValidationPipe()) data: UserDto){
        return this.userService.register(data);
    }

    @Post("login")
    login(@Body(new ValidationPipe()) data: userLoginType){
        return this.userService.login(data);
    }

    @Patch("update/:id")
    @UseInterceptors(FileInterceptor("image", multerCon))
    async updateImage(@Param("id") id:string,@UploadedFile() image: Express.Multer.File){
        if(image){
            let oldimage = await this.userService.findImage(id);
            try {
            let  eskiimage = join(__dirname, "../../uploads", oldimage);
            await fs.unlink(eskiimage); 
            return {file:image.filename}
            }
            catch (err) {
                console.error(`Xatolik yuz berdi: ${err.message}`);
                }
            }
        }


    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Body(new ValidationPipe()) data: UserUpDto, @Request() req, @Param("id", new ValidationPipe())id:string){
        let userId = req.user.id;
        return this.userService.update(userId,id,data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Request() req, @Param("id", new ValidationPipe())id:string){
        let userId = req.user.id;
        return this.userService.remove(userId,id);
    }
} 