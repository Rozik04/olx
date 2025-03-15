import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entity/comment.entity';
import { commentDto } from './dto/comment.dto';
import { commentUpDto } from './dto/commentUpdate.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>){}


    async findAll(){
        let data = await this.commentModel.find().populate("userId", "name phone").populate("elonId", "name").exec();
        if(!data.length){
            return "No comments found!"
        }
        return {data}
    }


    async findOne(id:string){
        let Data = await this.commentModel.findById(id)
        if(!Data){
            return "No found comment"
        }
        return {Data}
    }


    async create(data:commentDto){
        let createdData = await this.commentModel.create(data)
        return {createdData}
    }


    async update(id:string, data:commentUpDto){
        let updatedData = await this.commentModel.findByIdAndUpdate(id, data, {new:true})
        return {updatedData}
    }

    async remove(id:string){
        let deletedData = await this.commentModel.findByIdAndDelete(id)
        return {deletedData}
    }

    
}
