import { IsNotEmpty } from "class-validator";
export class SearchUserSkillByNameDto {
	@IsNotEmpty()
	skillName: string;
    userId:string;
}
