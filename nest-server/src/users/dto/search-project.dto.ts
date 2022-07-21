import { IsNotEmpty } from "class-validator";
export class SearchUserProjectByTitleDto {
	@IsNotEmpty()
	projectTitle: string;
    userId:string;
}
