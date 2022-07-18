import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(registerUserDto: RegisterUserDto, response: any): Promise<any>;
}
