import { IsNotEmpty } from "class-validator";
export class AddUserProjectDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: number;
  @IsNotEmpty()
  userId: string;
  skillName: Array<any>;
}
