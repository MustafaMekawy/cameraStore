import { IsString } from 'class-validator';

export class ReturnOrderDto {
  @IsString()
  orderId: string;
}
