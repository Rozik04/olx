import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment,commentSchema } from './entity/comment.entity';
import { User, userSchema } from 'src/user/entity/user.entity';
import { Product, ProductSchema } from 'src/elon/entity/elon.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:Comment.name, schema:commentSchema}]),
  MongooseModule.forFeature([{name:User.name, schema:userSchema}]),
  MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}]),
  JwtModule.register({secret:"secretKey", signOptions:{expiresIn:"1h"}})],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
