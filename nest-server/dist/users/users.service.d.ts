import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(registerUserDto: RegisterUserDto): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
}
