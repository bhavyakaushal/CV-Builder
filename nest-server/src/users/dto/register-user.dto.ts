import { IsNotEmpty } from "class-validator";
export class RegisterUserDto {
	@IsNotEmpty()
	email: string;
	contact: string;
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	username: string;
	aboutme: string;
}
