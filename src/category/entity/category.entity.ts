import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

 


 export type categoryDocument = HydratedDocument<Category>

 @Schema()
 export class Category{
    @Prop()
    name:string
    @Prop()
    image:string
 }

 export let categorySchema = SchemaFactory.createForClass(Category)