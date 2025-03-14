import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/multer';

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
