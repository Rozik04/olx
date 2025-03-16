import { BadRequestException, Request, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/multer';
import { join } from 'path';
import * as fs from "fs/promises"
import { JwtAuthGuard } from 'src/auth.guard';
import { categoryUpDto } from './dto/categoryUp.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Get()
    findAll(){
        return this.categoryService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id:string){
        return this.categoryService.findOne(id)
    }

    @Post("upload-image")
    @UseInterceptors(FileInterceptor("image", multerCon))
    uploadFile(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
    throw new BadRequestException("No file uploaded");
    }
    return { filename: image.filename };
    }

    @Patch("update/:id")
    @UseInterceptors(FileInterceptor("image", multerCon))
    async updateImage(@Param("id") id:string,@UploadedFile() image: Express.Multer.File){
        if(image){
            let oldimage = await this.categoryService.findImage(id);
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

    @Post("create")
    create(@Body(new ValidationPipe) data:categoryDto){
        return this.categoryService.create(data)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Request() req, @Param("id")id:string, @Body(new ValidationPipe) data:categoryUpDto){
        let userId = req.user.id
        return this.categoryService.update(userId, id, data)
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Request() req,@Param("id")id:string){
        let userId = req.user.id
        return this.categoryService.remove(userId, id)
    }
    
}
