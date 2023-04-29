import { IsEnum } from 'class-validator';
import { CategoryEnum } from 'src/factory/enums/category.enum';

export class CreateCategoryDto {
  @IsEnum(CategoryEnum)
  name: string;
}
