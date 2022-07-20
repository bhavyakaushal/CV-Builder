import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Skill } from './skill.schema';
import { Project } from './project.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  contact: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  aboutme: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }] })
  skillId: Skill[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projectId: Project[];
}

export const UserSchema = SchemaFactory.createForClass(User);