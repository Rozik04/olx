import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { RegionService } from './region.service';
import { regionDto } from 'src/region/dto/region.dto';

@Controller('region')
export class RegionController {
    constructor(private readonly regionService: RegionService){}

    @Get()
    findAll(){
        return this.regionService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id:string){
        return this.regionService.findOne(id)
    }

    @Post()
    create(@Body(new ValidationPipe) data:regionDto){
        return this.regionService.create(data)
    }

    @Patch(":id")
    update(@Body(new ValidationPipe) data:regionDto, @Param("id") id:string){
        return this.regionService.update(id, data)
    }

    @Delete(":id")
    remove(@Param("id") id:string){
        return this.regionService.remove(id)
    }

    
}
