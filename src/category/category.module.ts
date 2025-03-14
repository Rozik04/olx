import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './entity/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Category.name, schema:categorySchema}])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
