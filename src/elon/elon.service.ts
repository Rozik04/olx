import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entity/elon.entity';
import { Model } from 'mongoose';
import { ProductDto } from './dto/elon.dto';
import { ProductUpDto } from './dto/elonUp.dto';
import {join} from 'path';
import * as fs from "fs/promises"

@Injectable()
export class ElonService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){}

    async findAll(){
        let data = await this.productModel.find().populate("categoryId", "name").populate("userId","name").exec();
        if(!data.length){
            return "No products found";
        }
        return data
    }

    async findOne(id:string){
        let data = await this.productModel.findById(id).populate("categoryId", "name").populate("userId","name").exec();
        if(!data){
            return "product not found";
        }
        return data
    }

    async create(data : ProductDto){
        let createdData = await this.productModel.create(data)
        return {createdData}
    }

    async findImage(id:string){
        let Data = await this.productModel.findById(id)
        if(!Data){
            return "No found product"
        }
        return Data.image
    }

    async update(userId:string, id:string, data: ProductUpDto){
        let updatedData = await this.productModel.findByIdAndUpdate(id, data, {new:true})
        return {updatedData}
    }

    async remove(userId:string, id:string){
        let data = await this.productModel.findById(id)
        if(!data){
            return "Not found product"
        }
        if(data.image){
            try {
                let oldimage = join(__dirname,"../../uploads", data.image)
                fs.unlink(oldimage)
                let deletedData = await this.productModel.findByIdAndDelete(id)
                return {deletedData}   
            } catch (error) {
                return {error:error.message}
            }
    }}
}
