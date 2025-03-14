import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionModule } from './region/region.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/on-shop'), RegionModule, CommentModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
