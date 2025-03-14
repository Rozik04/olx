import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, regionSchema } from 'src/region/entity/region.entity';
import { UserModule } from 'src/user/user.module';
import { User, userSchema } from 'src/user/entity/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Region.name, schema:regionSchema}]),
  MongooseModule.forFeature([{name:User.name, schema:userSchema}])],
  controllers: [RegionController],
  providers: [RegionService]})
export class RegionModule {}
