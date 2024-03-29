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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const register_user_dto_1 = require("./dto/register-user.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const add_skill_dto_1 = require("./dto/add-skill.dto");
const add_project_dto_1 = require("./dto/add-project.dto");
const search_skill_dto_1 = require("./dto/search-skill.dto");
const search_project_dto_1 = require("./dto/search-project.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(registerUserDto, response) {
        const res = await this.usersService.create(registerUserDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateUserById(updateUserDto, response) {
        const res = await this.usersService.updateUserById(updateUserDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async loginUser(signinUserDto, response) {
        const res = await this.usersService.loginUser(signinUserDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUserById(id, response) {
        const res = await this.usersService.getUserById(id);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async addUserSkill(addUserSkillDto, response) {
        const res = await this.usersService.addUserSkill(addUserSkillDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getSkillByUserId(userId, response) {
        const res = await this.usersService.getSkillByUserId(userId);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async searchSkillByName(searchUserSkillByNameDto, response) {
        const res = await this.usersService.searchSkillByName(searchUserSkillByNameDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async addUserProject(addUserProjectDto, response) {
        const res = await this.usersService.addUserProject(addUserProjectDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getProjectByUserId(userId, response) {
        const res = await this.usersService.getProjectByUserId(userId);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async searchProjectByTitle(searchUserProjectByTitleDto, response) {
        const res = await this.usersService.searchProjectByTitle(searchUserProjectByTitleDto);
        if (res) {
            return response.status(200).json(Object.assign({}, res));
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SigninUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/skill"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_skill_dto_1.AddUserSkillDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUserSkill", null);
__decorate([
    (0, common_1.Get)("/skill/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSkillByUserId", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/search-skill"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_skill_dto_1.SearchUserSkillByNameDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchSkillByName", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/project"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_project_dto_1.AddUserProjectDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUserProject", null);
__decorate([
    (0, common_1.Get)("/project/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProjectByUserId", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)("/search-project"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_project_dto_1.SearchUserProjectByTitleDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchProjectByTitle", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map