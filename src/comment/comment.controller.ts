import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentDto } from './dto/comment.dto';
import { commentUpDto } from './dto/commentUpdate.dto';
import { JwtAuthGuard } from 'src/auth.guard';

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
    @UseGuards(JwtAuthGuard)
    update(@Param("id") id:string,@Request() req, @Body(new ValidationPipe) data:commentUpDto){
        let userId = req.user.id
        return this.commentService.update(userId, id, data);
    }


    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Request() req, @Param("id") id:string){
        let userId = req.user.id
        return this.commentService.remove(userId, id);
    }

    @Get("user/:id")
    @UseGuards(JwtAuthGuard)
    finds(@Request() req, @Param("id") usId: string){
        let userId = req.user.id
        return this.commentService.finds(userId, usId)
    }

}
