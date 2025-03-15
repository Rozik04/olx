import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/multer';
import { join } from 'path';
import * as fs from "fs/promises"

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

    @Patch(":id")
    update(@Param("id")id:string, @Body(new ValidationPipe) data:categoryDto){
        return this.categoryService.update(id, data)
    }
  
    @Delete(":id")
    remove(@Param("id")id:string){
        return this.categoryService.remove(id)
    }
    
}
