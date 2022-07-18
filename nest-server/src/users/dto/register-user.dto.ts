import { IsNotEmpty } from 'class-validator';
export class RegisterUserDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  contact: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  phone: number;
  @IsNotEmpty()
  aboutme: string;
}
