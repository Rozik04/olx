import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { Model } from 'mongoose';
import * as fs from "fs/promises"
import { InjectModel } from '@nestjs/mongoose';
import { categoryDto } from './dto/category.dto';
import {join} from 'path';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel:Model<Category>){}

    async findAll(){
        let Data = await this.categoryModel.find()
        if(!Data.length){
            return "No found categories"
        }
        return {Data}
    }

    async findOne(id:string){
        let Data = await this.categoryModel.findById(id)
        if(!Data){
            return "No found category"
        }
        return {Data}
    }

    async create(data:categoryDto){
        let createdData = await this.categoryModel.create(data)
        return {createdData}
    }

    async update(id:string, data:categoryDto){
        let updatedData = await this.categoryModel.findByIdAndUpdate(id, data, {new:true})
        return {updatedData}
    }
    
    async remove(id:string){
        let checkCategory = await this.categoryModel.findById(id)
        if(!checkCategory){
            return "Not found category"
        }
        if(checkCategory.image){
            try {
                let i = join(__dirname, "../../uploads", checkCategory.image)
                 await fs.unlink(i)
            } catch (error) {
                return {error:error.message}
            }
        }
        let deletedData = await this.categoryModel.findByIdAndDelete(id)
        return {deletedData}
    }

}
