import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Region, regionSchema } from 'src/region/entity/region.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema:userSchema}]),
  MongooseModule.forFeature([{name:Region.name, schema:regionSchema}]),
  JwtModule.register({secret:"secretKey", signOptions:{expiresIn:"1h"}})],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
