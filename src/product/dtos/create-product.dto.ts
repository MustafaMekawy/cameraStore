import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePoroductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  categoryName: string;
}
