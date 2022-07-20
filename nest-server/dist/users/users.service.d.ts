/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
import { UserResponseObject } from "./interfaces/user.interface";
import { AddUserSkillDto } from "./dto/add-skill.dto";
import { Skill, SkillDocument } from "src/schemas/skill.schema";
import { AddUserProjectDto } from "./dto/add-project.dto";
import { Project, ProjectDocument } from "src/schemas/project.schema";
import { SearchUserSkillByNameDto } from "./dto/search-skill.dto";
import { SearchUserProjectByTitleDto } from "./dto/search-project.dto";
export declare class UsersService {
    private userModel;
    private skillModel;
    private projectModel;
    constructor(userModel: Model<UserDocument>, skillModel: Model<SkillDocument>, projectModel: Model<ProjectDocument>);
    create(registerUserDto: RegisterUserDto): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    loginUser(signinUserDto: SigninUserDto): Promise<{
        success: boolean;
        error: string;
        responseData?: undefined;
    } | {
        success: boolean;
        responseData: {
            id: import("mongoose").Schema.Types.ObjectId;
            email: string;
            username: string;
            contact: number;
            aboutme: string;
        };
        error?: undefined;
    }>;
    getUserById(id: string): Promise<{
        success: boolean;
        error: string;
        userData?: undefined;
    } | {
        success: boolean;
        userData: User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        error?: undefined;
    }>;
    addUserSkill(addUserSkillDto: AddUserSkillDto): Promise<{
        success: boolean;
        error: string;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    getSkillByUserId(userId: string): Promise<{
        success: boolean;
        error: string;
        userSkills?: undefined;
    } | {
        success: boolean;
        userSkills: (Skill & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        error?: undefined;
    }>;
    addUserProject(addUserProjectDto: AddUserProjectDto): Promise<{
        success: boolean;
        error: string;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    getProjectByUserId(userId: string): Promise<{
        success: boolean;
        error: string;
        userProjects?: undefined;
    } | {
        success: boolean;
        userProjects: (Project & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        error?: undefined;
    }>;
    searchSkillByName(searchUserSkillByNameDto: SearchUserSkillByNameDto): Promise<{
        success: boolean;
        error: string;
        searchedSkill?: undefined;
    } | {
        success: boolean;
        searchedSkill: (Skill & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        error?: undefined;
    }>;
    searchProjectByTitle(searchUserProjectByTitleDto: SearchUserProjectByTitleDto): Promise<{
        success: boolean;
        error: string;
        searchedProject?: undefined;
    } | {
        success: boolean;
        searchedProject: (Project & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        error?: undefined;
    }>;
    createSearchSkillObject(searchUserSkillByNameDto: SearchUserSkillByNameDto): {
        userId: string;
        skill: string;
    };
    createSearchProjectObject(searchUserProjectByTitleDto: SearchUserProjectByTitleDto): {
        userId: string;
        title: string;
    };
    createResponseData(userDetails: UserResponseObject): {
        id: import("mongoose").Schema.Types.ObjectId;
        email: string;
        username: string;
        contact: number;
        aboutme: string;
    };
}
