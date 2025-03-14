import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type regionDocument = HydratedDocument<Region>;

@Schema()
export class Region{
    @Prop()
    name: string
}

export const regionSchema = SchemaFactory.createForClass(Region);