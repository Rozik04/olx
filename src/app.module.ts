import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionModule } from './region/region.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { ElonModule } from './elon/elon.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, RegionModule, CommentModule, CategoryModule, ElonModule, OrderModule,  MongooseModule.forRoot('mongodb://127.0.0.1:27017/on-shop')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
