"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt_1 = require("../utils/bcrypt");
const skill_schema_1 = require("../schemas/skill.schema");
const project_schema_1 = require("../schemas/project.schema");
let UsersService = class UsersService {
    constructor(userModel, skillModel, projectModel) {
        this.userModel = userModel;
        this.skillModel = skillModel;
        this.projectModel = projectModel;
    }
    async create(registerUserDto) {
        try {
            registerUserDto.password = await (0, bcrypt_1.encodePassword)(registerUserDto.password);
            const saveUser = await new this.userModel(registerUserDto).save();
            if (saveUser) {
                return {
                    success: true,
                };
            }
            else {
                return {
                    success: false,
                    error: "error in creating user",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async loginUser(signinUserDto) {
        try {
            const email = signinUserDto.email;
            const findUser = await this.userModel.findOne({ email });
            if (!findUser) {
                return {
                    success: false,
                    error: "User not exist",
                };
            }
            const matchPassword = (0, bcrypt_1.comparePasswords)(signinUserDto.password, findUser.password);
            if (!matchPassword) {
                return {
                    success: false,
                    error: "Invalid user password",
                };
            }
            const responseData = this.createResponseData(findUser);
            return {
                success: true,
                responseData,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUserById(id) {
        try {
            const userData = await this.userModel.findById(id);
            if (!userData) {
                return {
                    success: false,
                    error: "User not exist",
                };
            }
            return {
                success: true,
                userData,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async addUserSkill(addUserSkillDto) {
        try {
            if (addUserSkillDto.rating === 0 || addUserSkillDto.rating > 5) {
                return {
                    success: false,
                    error: "Please choose a rating in between 1 to 5 star",
                };
            }
            const saveSkill = await new this.skillModel(addUserSkillDto).save();
            if (!saveSkill) {
                return {
                    success: false,
                    error: "error in saving user's skills",
                };
            }
            const addSkillToUser = await this.userModel.updateOne({ _id: addUserSkillDto.userId }, { $push: { skillId: saveSkill.id } });
            if (!addSkillToUser) {
                return {
                    success: false,
                    error: "error in saving user's skills",
                };
            }
            return {
                success: true,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getSkillByUserId(userId) {
        try {
            const userSkills = await this.skillModel.find({ userId });
            if (!userSkills) {
                return {
                    success: false,
                    error: "error in getting user skills",
                };
            }
            return {
                success: true,
                userSkills,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async addUserProject(addUserProjectDto) {
        try {
            const saveProject = await new this.projectModel(addUserProjectDto).save();
            if (!saveProject) {
                return {
                    success: false,
                    error: "error in saving user's project",
                };
            }
            const addProjectToUser = await this.userModel.updateOne({ _id: addUserProjectDto.userId }, { $push: { projectId: saveProject.id } });
            if (!addProjectToUser) {
                return {
                    success: false,
                    error: "error in saving user's project",
                };
            }
            return {
                success: true,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProjectByUserId(userId) {
        try {
            const userProjects = await this.projectModel.find({ userId });
            if (!userProjects) {
                return {
                    success: false,
                    error: "error in getting user projects",
                };
            }
            return {
                success: true,
                userProjects,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async searchSkillByName(searchUserSkillByNameDto) {
        try {
            const searchSkill = this.createSearchSkillObject(searchUserSkillByNameDto);
            const searchedSkill = await this.skillModel.find(searchSkill);
            if (searchedSkill.length === 0) {
                return {
                    success: false,
                    error: "skill not found",
                };
            }
            return {
                success: true,
                searchedSkill,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async searchProjectByTitle(searchUserProjectByTitleDto) {
        try {
            const searchProject = this.createSearchProjectObject(searchUserProjectByTitleDto);
            const searchedProject = await this.projectModel.find(searchProject);
            if (searchedProject.length === 0) {
                return {
                    success: false,
                    error: "project not found",
                };
            }
            return {
                success: true,
                searchedProject,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    createSearchSkillObject(searchUserSkillByNameDto) {
        return {
            userId: searchUserSkillByNameDto.userId,
            skill: searchUserSkillByNameDto.skillName,
        };
    }
    createSearchProjectObject(searchUserProjectByTitleDto) {
        return {
            userId: searchUserProjectByTitleDto.userId,
            title: searchUserProjectByTitleDto.projectTitle,
        };
    }
    createResponseData(userDetails) {
        return {
            id: userDetails._id,
            email: userDetails.email,
            username: userDetails.username,
            contact: userDetails.contact,
            aboutme: userDetails.aboutme,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(skill_schema_1.Skill.name)),
    __param(2, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map