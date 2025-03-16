import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './entity/category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name:Category.name, schema:categorySchema}]),
  JwtModule.register({secret:"secretKey", signOptions:{expiresIn:"1h"}})],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
