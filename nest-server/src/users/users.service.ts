import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(registerUserDto: RegisterUserDto) {
    const saveUser = await new this.userModel(registerUserDto).save();
    if (saveUser) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: 'error in creating user',
      };
    }
  }
}
