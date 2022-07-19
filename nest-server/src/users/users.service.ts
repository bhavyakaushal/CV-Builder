import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { comparePasswords, encodePassword } from "../utils/bcrypt";
import { SigninUserDto } from "./dto/sign-in.dto";
import { UserResponseObject } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(registerUserDto: RegisterUserDto) {
    registerUserDto.password = await encodePassword(registerUserDto.password);
    const saveUser = await new this.userModel(registerUserDto).save();
    if (saveUser) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "error in creating user",
      };
    }
  }

  async loginUser(signinUserDto: SigninUserDto) {
    const email = signinUserDto.email;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) {
      return {
        success: false,
        error: "User not exist",
      };
    }
    const matchPassword = comparePasswords(
      signinUserDto.password,
      findUser.password
    );
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

  createResponseData(userDetails: UserResponseObject) {
    return {
      email: userDetails.email,
      username: userDetails.username,
      contact: userDetails.contact,
      aboutme: userDetails.aboutme,
    };
  }
}
