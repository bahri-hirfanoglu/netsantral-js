import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsUrl()
  baseUrl?: string;
}
