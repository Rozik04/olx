import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ElonService } from './elon.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/multer';
import { ProductDto } from './dto/elon.dto';
import * as fs from "fs/promises"
import { join } from 'path';
import { ProductUpDto } from './dto/elonUp.dto';

@Controller('elon')
export class ElonController {
    constructor(private readonly productService: ElonService){}

    @Get()
    findAll(){
        return this.productService.findAll()
    }

    @Get(":id")
    findOne(@Param("id", new ValidationPipe) id:string){
        return this.productService.findOne(id)
    }

    @Post("upload-image")
    @UseInterceptors(FileInterceptor("image", multerCon))
    uploadFile(@UploadedFile() image: Express.Multer.File){
        if(!image){
            return "Image yuklanmadi"
        }
        return {file:image.filename}
    }

    @Post("create")
    create(@Body(new ValidationPipe)data:ProductDto){
        return this.productService.create(data)
    }

    @Patch("update/:id")
    @UseInterceptors(FileInterceptor("image", multerCon))
    async updateImage(@Param("id") id:string,@UploadedFile() image: Express.Multer.File){
        if(image){
            let oldimage = await this.productService.findImage(id);
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

    @Patch(":id")
    update(@Body(new ValidationPipe) data: ProductUpDto, @Param("id") id:string){
        return this.productService.update(id, data)
    }

    @Delete(":id")
    remove( @Param("id") id:string){
        return this.productService.remove(id)
    }


}
