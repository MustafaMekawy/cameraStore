import { PartialType } from '@nestjs/mapped-types';
import { CreatePoroductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreatePoroductDto) {}
