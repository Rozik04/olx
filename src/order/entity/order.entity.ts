import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Schema as MongooseSchema } from "mongoose";

export type OrderDocument = HydratedDocument<Comment>;

@Schema()
export class Order {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
    userId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Product" })
    elonId: Types.ObjectId;

    @Prop({ type: Date, default: Date.now })
    date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
