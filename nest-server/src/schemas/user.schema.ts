import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  contact: number;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  aboutme: string;
}

export const UserSchema = SchemaFactory.createForClass(User);