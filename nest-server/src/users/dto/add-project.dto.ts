import { IsNotEmpty } from "class-validator";
export class AddUserProjectDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  userId: string;
  skillName: Array<any>;
}
