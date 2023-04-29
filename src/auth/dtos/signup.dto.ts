import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/factory/enums/roles.enum';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;

  @IsPhoneNumber('EG')
  phone: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  role: string;

  @IsOptional()
  @IsString()
  serialNo: string;
}
