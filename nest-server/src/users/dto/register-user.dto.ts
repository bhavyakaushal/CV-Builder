import { IsNotEmpty } from "class-validator";
export class RegisterUserDto {
	@IsNotEmpty()
	email: string;
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	username: string;
}
