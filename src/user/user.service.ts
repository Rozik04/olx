import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import * as fs from "fs/promises"
import * as bcrypt from "bcrypt";
import { userLoginType } from 'src/user/dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserUpDto } from 'src/user/dto/userUp.dto';
import * as path from 'path';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>, private readonly jwtSerive: JwtService){}

    async findAll(){
        return await this.userModel.find().populate("regionId").exec();
    }

    async findOne(id:string){
        let Data = await this.userModel.findById(id).populate("regionid").exec();
        if(!Data){
            return "No found region"
        }
        return {Data}
    }

    async register(data: UserDto){
        const {password, email, ...odata} = data;

        let checkUser = await this.userModel.findOne({email});
        if(checkUser){
            throw new BadRequestException('User with this email already exists');
        }

        let hashedPassword = bcrypt.hashSync(password, 10);
        

        let createdUser = await this.userModel.create({...data, password: hashedPassword})
        return createdUser.save();
    }

    async login(data: userLoginType){
        let {email, password} = data;
        let checkEmail = await this.userModel.findOne({email});
        if(!checkEmail){
            throw new Error("This email doesn't exists or incorrect!");
        }
        let checkPassword = bcrypt.compareSync(password, checkEmail.password);
        if(!checkPassword){
            throw new Error("Wrong password!");
        }
        let token = this.jwtSerive.sign({id:checkEmail.id});
        return {data:checkEmail, token};
    }

    async findImage(id:string){
        let Data = await this.userModel.findById(id)
        if(!Data){
            return "No found user"
        }
        return Data.image
    }

    async update(userId:string, id:string, data:UserUpDto){
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (data.image) {
            try {
                let impath = path.join(__dirname, "../../uploads", user.image);
                await fs.unlink(impath); 
            } catch (err) {
                console.error(`Xatolik yuz berdi: ${err.message}`);
            }
        }
        let updatedData = await this.userModel.findByIdAndUpdate(id, data,{new:true})
        
        return {updatedData};
    }

    async remove(userId:string, id:string){
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        if (user._id.toString() !== userId) {
            throw new ForbiddenException('Faqat ozingni ochirasan.');
        }
        if (user.image) {
            try {
                let impath = path.join(__dirname, "../../uploads", user.image);
                await fs.unlink(impath); 
            } catch (err) {
                console.error(`Xatolik yuz berdi: ${err.message}`);
            }
        }
        let deletedData = await this.userModel.findByIdAndDelete(id)
        return {deletedData};
    }
}
