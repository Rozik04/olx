import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entity/order.entity';
import { User, userSchema } from 'src/user/entity/user.entity';
import { Product, ProductSchema } from 'src/elon/entity/elon.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name:Order.name, schema:OrderSchema}]),
  MongooseModule.forFeature([{name:User.name, schema:userSchema}]),
  JwtModule.register({secret:"secretKey", signOptions:{expiresIn:"1h"}}),
  MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
