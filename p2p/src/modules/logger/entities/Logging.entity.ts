import { Document, Mixed, } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
export type LogsDocument = Logs & Document;
import { Schema as MongooseSchema } from "mongoose";
@Schema()
export class Logs {
  
  @Prop()
  corlId: string;

  @Prop()
  payload: MongooseSchema.Types.Mixed;

  @Prop({ default: new Date() })
  lastDetectionTime: Date;
}


const schema = SchemaFactory.createForClass(Logs);
export const Logschema = schema;

