import { Model } from "mongoose";
import { UserDocument } from "src/schemas/user.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
import { UserResponseObject } from "./interfaces/user.interface";
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
    loginUser(signinUserDto: SigninUserDto): Promise<{
        success: boolean;
        error: string;
        responseData?: undefined;
    } | {
        success: boolean;
        responseData: {
            email: string;
            username: string;
            contact: number;
            aboutme: string;
        };
        error?: undefined;
    }>;
    createResponseData(userDetails: UserResponseObject): {
        email: string;
        username: string;
        contact: number;
        aboutme: string;
    };
}
