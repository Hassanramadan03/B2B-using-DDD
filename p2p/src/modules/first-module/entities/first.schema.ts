import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type FirstDocument = First & Document;

@Schema({ collection: "First", timestamps: true })
export class First extends Document {
  @Prop({ default: Date.now })
  lastModifiedDate: number;
}

export const FirstSchema = SchemaFactory.createForClass(First);
