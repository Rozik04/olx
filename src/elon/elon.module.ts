import { Module } from '@nestjs/common';
import { ElonController } from './elon.controller';
import { ElonService } from './elon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entity/elon.entity';
import { User, userSchema } from 'src/user/entity/user.entity';
import { Category, categorySchema } from 'src/category/entity/category.entity';
import { Order, OrderSchema } from 'src/order/entity/order.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}]),
  MongooseModule.forFeature([{name:User.name, schema:userSchema}]),
  MongooseModule.forFeature([{name:Category.name, schema:categorySchema}]),
  MongooseModule.forFeature([{name:Order.name, schema:OrderSchema}]),
  JwtModule.register({secret:"secretKey", signOptions:{expiresIn:"1h"}})],
  controllers: [ElonController],
  providers: [ElonService]
})
export class ElonModule {}

