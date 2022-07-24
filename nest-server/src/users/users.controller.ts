import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  InternalServerErrorException,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SigninUserDto } from "./dto/sign-in.dto";
import { AddUserSkillDto } from "./dto/add-skill.dto";
import { AddUserProjectDto } from "./dto/add-project.dto";
import { SearchUserSkillByNameDto } from "./dto/search-skill.dto";
import { SearchUserProjectByTitleDto } from "./dto/search-project.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post("/register")
  async create(@Body() registerUserDto: RegisterUserDto, @Res() response) {
    const res = await this.usersService.create(registerUserDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Put()
  async updateUserById(@Body() updateUserDto: UpdateUserDto, @Res() response) {
    const res = await this.usersService.updateUserById(updateUserDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Post("/login")
  async loginUser(@Body() signinUserDto: SigninUserDto, @Res() response) {
    const res = await this.usersService.loginUser(signinUserDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get(":id")
  async getUserById(@Param("id") id: string, @Res() response) {
    const res = await this.usersService.getUserById(id);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Post("/skill")
  async addUserSkill(
    @Body() addUserSkillDto: AddUserSkillDto,
    @Res() response
  ) {
    const res = await this.usersService.addUserSkill(addUserSkillDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get("/skill/:userId")
  async getSkillByUserId(@Param("userId") userId: string, @Res() response) {
    const res = await this.usersService.getSkillByUserId(userId);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Post("/search-skill")
  async searchSkillByName(
    @Body() searchUserSkillByNameDto: SearchUserSkillByNameDto,
    @Res() response
  ) {
    const res = await this.usersService.searchSkillByName(
      searchUserSkillByNameDto
    );
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Post("/project")
  async addUserProject(
    @Body() addUserProjectDto: AddUserProjectDto,
    @Res() response
  ) {
    const res = await this.usersService.addUserProject(addUserProjectDto);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get("/project/:userId")
  async getProjectByUserId(@Param("userId") userId: string, @Res() response) {
    const res = await this.usersService.getProjectByUserId(userId);
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @UsePipes(ValidationPipe)
  @Post("/search-project")
  async searchProjectByTitle(
    @Body() searchUserProjectByTitleDto: SearchUserProjectByTitleDto,
    @Res() response
  ) {
    const res = await this.usersService.searchProjectByTitle(
      searchUserProjectByTitleDto
    );
    if (res) {
      return response.status(200).json({ ...res });
    } else {
      throw new InternalServerErrorException();
    }
  }
}
