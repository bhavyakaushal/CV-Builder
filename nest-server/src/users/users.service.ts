import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { comparePasswords, encodePassword } from "../utils/bcrypt";
import { SigninUserDto } from "./dto/sign-in.dto";
import { UserResponseObject } from "./interfaces/user.interface";
import { AddUserSkillDto } from "./dto/add-skill.dto";
import { Skill, SkillDocument } from "src/schemas/skill.schema";
import { AddUserProjectDto } from "./dto/add-project.dto";
import { Project, ProjectDocument } from "src/schemas/project.schema";
import { SearchUserSkillByNameDto } from "./dto/search-skill.dto";
import { SearchUserProjectByTitleDto } from "./dto/search-project.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}
  async create(registerUserDto: RegisterUserDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(updateUserDto: UpdateUserDto) {
    try {
      const updateUserResponse = await this.userModel.updateOne(
        { _id: updateUserDto.userId },
        { $set: { ...updateUserDto } }
      );
      if (!updateUserResponse) {
        return {
          success: false,
          error: "error updating the user",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(signinUserDto: SigninUserDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string) {
    try {
      const userData = await this.userModel.findById(id);
      if (!userData) {
        return {
          success: false,
          error: "User not exist",
        };
      }
      return {
        success: true,
        userData,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addUserSkill(addUserSkillDto: AddUserSkillDto) {
    try {
      if (addUserSkillDto.rating === 0 || addUserSkillDto.rating > 5) {
        return {
          success: false,
          error: "Please choose a rating in between 1 to 5 star",
        };
      }
      const saveSkill = await new this.skillModel(addUserSkillDto).save();
      if (!saveSkill) {
        return {
          success: false,
          error: "error in saving user's skills",
        };
      }
      const addSkillToUser = await this.userModel.updateOne(
        { _id: addUserSkillDto.userId },
        { $push: { skillId: saveSkill.id } }
      );
      if (!addSkillToUser) {
        return {
          success: false,
          error: "error in saving user's skills",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getSkillByUserId(userId: string) {
    try {
      const userSkills = await this.skillModel.find({ userId });
      if (!userSkills) {
        return {
          success: false,
          error: "error in getting user skills",
        };
      }
      return {
        success: true,
        userSkills,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addUserProject(addUserProjectDto: AddUserProjectDto) {
    try {
      const id = addUserProjectDto.userId;
      const userSkills = addUserProjectDto.skillName;
      let userSkillsFromDB = [];
      for (let i = 0; i < userSkills.length; i++) {
        if (await this.skillModel.find({ id, skill: userSkills[i] })) {
          let userSkillFound = await this.skillModel.find({
            id,
            skill: userSkills[i],
          });
          if (userSkillFound.length > 0) {
            userSkillsFromDB.push(userSkillFound);
          } else {
            return {
              success: false,
              error: "skill not found",
            };
          }
        }
      }

      const skillIdArray = [];
      for (let i = 0; i < userSkillsFromDB.length; i++) {
        var skillId = userSkillsFromDB[i][0]._id.toString();
        skillIdArray.push(skillId);
      }

      const saveProjectQuery = this.createProjectSaveQueryObject(
        addUserProjectDto,
        skillIdArray
      );

      const saveProject = await new this.projectModel(saveProjectQuery).save();
      if (!saveProject) {
        return {
          success: false,
          error: "error in saving user's project",
        };
      }

      const addProjectToUser = await this.userModel.updateOne(
        { _id: addUserProjectDto.userId },
        { $push: { projectId: saveProject.id } }
      );
      if (!addProjectToUser) {
        return {
          success: false,
          error: "error in saving user's project",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectByUserId(userId: string) {
    try {
      const userProjects = await this.projectModel
        .find({ userId })
        .populate("skillId");
      if (!userProjects) {
        return {
          success: false,
          error: "error in getting user projects",
        };
      }
      return {
        success: true,
        userProjects,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async searchSkillByName(searchUserSkillByNameDto: SearchUserSkillByNameDto) {
    try {
      const searchSkill = this.createSearchSkillObject(
        searchUserSkillByNameDto
      );
      const searchedSkill = await this.skillModel.find(searchSkill);
      if (searchedSkill.length === 0) {
        return {
          success: false,
          error: "skill not found",
        };
      }
      return {
        success: true,
        searchedSkill,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async searchProjectByTitle(
    searchUserProjectByTitleDto: SearchUserProjectByTitleDto
  ) {
    try {
      const searchProject = this.createSearchProjectObject(
        searchUserProjectByTitleDto
      );
      const searchedProject = await this.projectModel.find(searchProject);
      if (searchedProject.length === 0) {
        return {
          success: false,
          error: "project not found",
        };
      }
      return {
        success: true,
        searchedProject,
      };
    } catch (error) {
      console.log(error);
    }
  }

  createSearchSkillObject(searchUserSkillByNameDto: SearchUserSkillByNameDto) {
    return {
      userId: searchUserSkillByNameDto.userId,
      skill: searchUserSkillByNameDto.skillName,
    };
  }

  createSearchProjectObject(
    searchUserProjectByTitleDto: SearchUserProjectByTitleDto
  ) {
    return {
      userId: searchUserProjectByTitleDto.userId,
      title: searchUserProjectByTitleDto.projectTitle,
    };
  }

  createResponseData(userDetails: UserResponseObject) {
    return {
      id: userDetails._id,
      email: userDetails.email,
      username: userDetails.username,
      contact: userDetails.contact,
      aboutme: userDetails.aboutme,
    };
  }

  createProjectSaveQueryObject(
    addUserProjectDto: AddUserProjectDto,
    skillIdArray
  ) {
    return {
      title: addUserProjectDto.title,
      description: addUserProjectDto.description,
      userId: addUserProjectDto.userId,
      skillId: skillIdArray,
    };
  }
}
