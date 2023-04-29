import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImportedSuplliesDto {
  @IsString()
  duration: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  officeId: string;
}
