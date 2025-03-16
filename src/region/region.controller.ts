import { Body, Controller, Request, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { RegionService } from './region.service';
import { regionDto } from 'src/region/dto/region.dto';
import { JwtAuthGuard } from 'src/auth.guard';

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
    @UseGuards(JwtAuthGuard)
    update(@Request() req,@Body(new ValidationPipe) data:regionDto, @Param("id") id:string){
        let userId = req.user.id
        return this.regionService.update(userId, id, data)
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Request() req,@Param("id") id:string){
        let userId = req.user.id
        return this.regionService.remove(userId, id)
    }

    
}
