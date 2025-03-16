import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { OrderUpDto } from './dto/orderUp.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

    async findAll() {
        let data = await this.orderModel.find().populate("userId", "name phone").populate("elonId", "name").exec();
        if (!data.length) {
            return "No orders found!";
        }
        return { data };
    }

    async findOne(id: string) {
        let data = await this.orderModel.findById(id);
        if (!data) {
            return "Order not found";
        }
        return { data };
    }

    async create(data: OrderDto) {
        let createdData = await this.orderModel.create(data);
        return { createdData };
    }

    async update(userId:string, id: string, data: OrderUpDto) {
        let updatedData = await this.orderModel.findByIdAndUpdate(id, data, { new: true });
        return { updatedData };
    }

    async remove(userId:string, id: string) {
        let deletedData = await this.orderModel.findByIdAndDelete(id);
        return { deletedData };
    }

    async finds(userId:string,usId:string){
        let users = await this.orderModel.find({userId:usId}).populate("elonId", "name").populate("userId", "name").exec();
        return users
    }
        

}
