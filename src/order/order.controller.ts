import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { OrderUpDto } from './dto/orderUp.dto';
import { JwtAuthGuard } from 'src/auth.guard';

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
    @UseGuards(JwtAuthGuard)
    update(@Request() req, @Param("id") id: string, @Body(new ValidationPipe()) data: OrderUpDto) {
        let userId = req.user.id
        return this.orderService.update(userId, id, data);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Request() req,@Param("id") id: string) {
        let userId = req.user.id
        return this.orderService.remove(userId, id);
    }

    @Get("orders/:id")
    @UseGuards(JwtAuthGuard)
    finds(@Request() req, @Param("id") usId: string){
        let userId = req.user.id
        return this.orderService.finds(userId, usId)
    }
}
