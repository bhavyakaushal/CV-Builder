import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
import { UserResponseObject } from "./interfaces/user.interface";
import { AddUserSkillDto } from "./dto/add-skill.dto";
import { Skill, SkillDocument } from "../schemas/skill.schema";
import { AddUserProjectDto } from "./dto/add-project.dto";
import { Project, ProjectDocument } from "../schemas/project.schema";
import { SearchUserSkillByNameDto } from "./dto/search-skill.dto";
import { SearchUserProjectByTitleDto } from "./dto/search-project.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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
    updateUserById(updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        error: string;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    loginUser(signinUserDto: SigninUserDto): Promise<{
        success: boolean;
        error: string;
        responseData?: undefined;
    } | {
        success: boolean;
        responseData: {
            id: Object;
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
        userProjects: Omit<Project & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
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
    createUserLoginResponseData(userDetails: UserResponseObject): {
        id: Object;
        email: string;
        username: string;
        contact: number;
        aboutme: string;
    };
    createProjectSaveQueryObject(addUserProjectDto: AddUserProjectDto, skillIdArray: any): {
        title: string;
        description: string;
        userId: string;
        skillId: any;
    };
    createUpdateUserWithProjectQueryObject(addUserProjectDto: AddUserProjectDto, saveProjectId: string): {
        _id: string;
        $push: {
            projectId: string;
        };
    };
    createUpdateUserWithSkillQueryObject(addUserSkillDto: AddUserSkillDto, skillId: string): {
        _id: string;
        $push: {
            skillId: string;
        };
    };
}
