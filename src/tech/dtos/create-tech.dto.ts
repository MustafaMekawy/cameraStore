import { IsNumber, IsString } from 'class-validator';

export class CreateTechDto {
  @IsNumber()
  price: number;

  @IsString()
  techId: string;
}
