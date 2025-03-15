import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { regionDto } from 'src/region/dto/region.dto';
import { Region } from 'src/region/entity/region.entity';

@Injectable()
export class RegionService {
    constructor(@InjectModel(Region.name) private readonly regionModel:Model<Region>){}

    async findAll(){
        let data = await this.regionModel.find();
        if(!data.length){
            return "No found regions"
        }
        return {data};
    }

    async findOne(id:string){
            let Data = await this.regionModel.findById(id)
            if(!Data){
                return "No found region"
            }
            return {Data}
    }

    async create(data:regionDto){
        let createdData = await this.regionModel.create({name:data.name});
        return {createdData};
    }

    async update(id:string, data:regionDto){
        let updatedData = await this.regionModel.findByIdAndUpdate(id, data, {new:true});
        return {updatedData};
    }

    async remove(id:string){
        let deltedData = await this.regionModel.findByIdAndDelete(id);
        return {deltedData};
    } 
}
