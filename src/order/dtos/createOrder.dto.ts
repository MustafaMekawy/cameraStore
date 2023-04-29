import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  duration: string;

  @IsString()
  clientId: string;

  @IsArray()
  products: Array<string>;

  @IsArray()
  @IsOptional()
  techs: Array<string>;
}
