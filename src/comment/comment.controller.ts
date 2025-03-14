import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentDto } from './dto/comment.dto';
import { commentUpDto } from './dto/commentUpdate.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}


    @Get()
    findAll(){
        return this.commentService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id:string){
        return this.commentService.findOne(id)
    }

    @Post("create")
    create(@Body(new ValidationPipe) data:commentDto){
        return this.commentService.create(data);
    }

    
    @Patch(":id")
    update(@Param("id") id:string, @Body(new ValidationPipe) data:commentUpDto){
        return this.commentService.update(id, data);
    }


    @Delete(":id")
    remove(@Param("id") id:string){
        return this.commentService.remove(id);
    }
}
