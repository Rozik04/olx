import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Schema as MongooseSchema, ObjectId } from "mongoose";



export type commentDocument = HydratedDocument<Comment>

@Schema()
export class Comment{
    @Prop({type: MongooseSchema.Types.ObjectId, ref:"User"})
    userId:Types.ObjectId
    @Prop({type: MongooseSchema.Types.ObjectId, ref:"Product"})
    elonId:Types.ObjectId
    @Prop()
    msg:string
    @Prop()
    star: number;
}

export let commentSchema = SchemaFactory.createForClass(Comment)