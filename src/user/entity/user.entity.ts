import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Schema as MongooseSchema, ObjectId, Types } from "mongoose";
import { type } from "os";

export type userDocument = HydratedDocument<User>;
type userType = "seller"|"client"|"admin"

@Schema()
export class User{
    @Prop()
    name: string
    @Prop()
    password: string
    @Prop()
    email: string
    @Prop()
    image: string
    @Prop()
    phone: string
    @Prop()
    shopName: string
    @Prop()
    role: userType
    @Prop({type: MongooseSchema.Types.ObjectId, ref:"Region"})
    regionId: Types.ObjectId
    @Prop()
    location: string
}

export const userSchema = SchemaFactory.createForClass(User);