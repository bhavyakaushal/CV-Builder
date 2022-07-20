import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop()
  skill: string;

  @Prop()
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);