import { Controller, Get, Post, Body, Patch, Param, Delete,Res, InternalServerErrorException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() registerUserDto: RegisterUserDto,  @Res() response,) {
    const res= await this.usersService.create(registerUserDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }
}
