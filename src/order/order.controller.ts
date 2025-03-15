import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { OrderUpDto } from './dto/orderUp.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.orderService.findOne(id);
    }

    @Post("create")
    create(@Body(new ValidationPipe()) data: OrderDto) {
        return this.orderService.create(data);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body(new ValidationPipe()) data: OrderUpDto) {
        return this.orderService.update(id, data);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.orderService.remove(id);
    }
}
