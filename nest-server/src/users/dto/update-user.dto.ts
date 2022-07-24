import { IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  userId: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  contact?: string;
  @IsOptional()
  aboutme?: string;
}
