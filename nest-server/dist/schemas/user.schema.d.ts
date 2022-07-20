import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Skill } from './skill.schema';
import { Project } from './project.schema';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    contact: number;
    password: string;
    username: string;
    aboutme: string;
    skillId: Skill[];
    projectId: Project[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
