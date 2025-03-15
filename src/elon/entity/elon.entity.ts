import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

export type ProductType = "ishlatilgan" | "yangi";

@Schema()
export class Product {
    @Prop()
    name: string;
    
    @Prop()
    image: string;
    
    @Prop()
    description: string;
    
    @Prop()
    price: number;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Category" })
    categoryId: Types.ObjectId;
    
    @Prop()
    star: number;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
    userId: Types.ObjectId;
    
    @Prop()
    sale: number;
    
    @Prop()
    color: string;
    
    @Prop()
    garanty: string;
    
    @Prop({ type: String, enum: ["ishlatilgan", "yangi"] })
    type: ProductType;
    
    @Prop({ default: Date.now })
    date: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
