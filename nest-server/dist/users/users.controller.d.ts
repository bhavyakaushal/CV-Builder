import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
import { AddUserSkillDto } from "./dto/add-skill.dto";
import { AddUserProjectDto } from "./dto/add-project.dto";
import { SearchUserSkillByNameDto } from "./dto/search-skill.dto";
import { SearchUserProjectByTitleDto } from "./dto/search-project.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(registerUserDto: RegisterUserDto, response: any): Promise<any>;
    loginUser(signinUserDto: SigninUserDto, response: any): Promise<any>;
    getUserById(id: string, response: any): Promise<any>;
    addUserSkill(addUserSkillDto: AddUserSkillDto, response: any): Promise<any>;
    getSkillByUserId(userId: string, response: any): Promise<any>;
    searchSkillByName(searchUserSkillByNameDto: SearchUserSkillByNameDto, response: any): Promise<any>;
    addUserProject(addUserProjectDto: AddUserProjectDto, response: any): Promise<any>;
    getProjectByUserId(userId: string, response: any): Promise<any>;
    searchProjectByTitle(searchUserProjectByTitleDto: SearchUserProjectByTitleDto, response: any): Promise<any>;
}
