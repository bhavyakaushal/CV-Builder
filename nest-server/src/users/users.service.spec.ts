import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User, UserSchema } from "../schemas/user.schema";
import { Skill, SkillSchema } from "../schemas/skill.schema";
import { Project, ProjectSchema } from "../schemas/project.schema";
import { MongooseModule } from "@nestjs/mongoose";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot("mongodb://localhost/nest"),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Skill.name, schema: SkillSchema },
          { name: Project.name, schema: ProjectSchema },
        ]),
      ],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create createSearchSkillObject", () => {
    const searchUserSkillByNameDto = {
      skillName: "React JS",
      userId: "1234",
    };
    const responseObject = service.createSearchSkillObject(
      searchUserSkillByNameDto
    );
    expect(responseObject.skill).toBe(searchUserSkillByNameDto.skillName);
    expect(responseObject.userId).toBe(searchUserSkillByNameDto.userId);
  });

  it("should create createSearchProjectObject", () => {
    const searchUserProjectByTitleDto = {
      projectTitle: "Backend project",
      userId: "1234",
    };
    const responseObject = service.createSearchProjectObject(
      searchUserProjectByTitleDto
    );
    expect(responseObject.title).toBe(searchUserProjectByTitleDto.projectTitle);
    expect(responseObject.userId).toBe(searchUserProjectByTitleDto.userId);
  });

  it("should create createUserLoginResponseDatat", () => {
    const userResponseObject = {
      _id: 'new ObjectId("62dcef1a4a3f35f92c6cd73b")',
      email: "abc56@gamil.com",
      password: "$2b$10$dUf3GPhOVRahqys6YvolkuQ11lZQJvJzvpMc9CpUQKoG9vfBFRrO6",
      username: "abc7101",
      contact: 123,
      aboutme: "hello",
      skillId: [],
      projectId: [],
      __v: 0,
    };
    const responseObject =
      service.createUserLoginResponseData(userResponseObject);
    expect(responseObject.id).toBe(userResponseObject._id);
    expect(responseObject.contact).toBe(userResponseObject.contact);
  });

  it("should create createProjectSaveQueryObject", () => {
    const addUserProjectDto = {
      title: "CV-Builder",
      description: "This project will help you to build up your CV",
      userId: "123",
      skillName: ["reactJS", "nodeJS"],
    };
    const skillIdArray = ["838", "834"];
    const responseObject = service.createProjectSaveQueryObject(
      addUserProjectDto,
      skillIdArray
    );
    expect(responseObject.title).toBe(addUserProjectDto.title);
    expect(responseObject.skillId).toBe(skillIdArray);
  });

  it("should create createUpdateUserWithProjectQueryObject", () => {
    const addUserProjectDto = {
      title: "CV-Builder",
      description: "This project will help you to build up your CV",
      userId: "123",
      skillName: ["reactJS", "nodeJS"],
    };
    const saveProjectId = "211";
    const responseObject = service.createUpdateUserWithProjectQueryObject(
      addUserProjectDto,
      saveProjectId
    );
    expect(responseObject._id).toBe(addUserProjectDto.userId);
  });

  it("should create createUpdateUserWithSkillQueryObject", () => {
    const addUserSkillDto = {
      skill: "nodeJS",
      userId: "123",
      rating: 5,
    };
    const skillId = "211";
    const responseObject = service.createUpdateUserWithSkillQueryObject(
      addUserSkillDto,
      skillId
    );
    expect(responseObject._id).toBe(addUserSkillDto.userId);
  });
});
