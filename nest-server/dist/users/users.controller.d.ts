import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(registerUserDto: RegisterUserDto, response: any): Promise<any>;
    loginUser(signinUserDto: SigninUserDto, response: any): Promise<any>;
}
