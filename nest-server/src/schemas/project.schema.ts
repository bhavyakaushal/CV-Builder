import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Skill } from './skill.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }] })
  skillId: Skill[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);