import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles('admin', RolesEnum.Employee)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Roles('admin', RolesEnum.Employee)
  @Get()
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  
  @Get(":id")
  findoneCategoriey(@Param('id') id: string) {
    return this.categoryService.findoneCategoriey(id);
  }

  @Roles('admin', RolesEnum.Employee)
  @Post('id')
  updateCategories(
    @Param('id') id: string,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, UpdateCategoryDto);
  }
}
