import { IsNotEmpty } from 'class-validator';
export class AddUserSkillDto {
  @IsNotEmpty()
  skill: string;
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  userId: string;
}
