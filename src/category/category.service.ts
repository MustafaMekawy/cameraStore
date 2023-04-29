import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ErrorHandler } from 'src/factory/errorHandler';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  response = new ResponseClass();
  crud = new CRUD();
  errorHandler = new ErrorHandler();

  //   Find All Categories using crud factory
  async findAllCategories() {
    return this.crud.findAll(this.prisma.category);
  }

  //   Create new Category
  async createCategory(createCategoryDto: any) {
    try {
      // create new category
      const newCategory = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
        },
      });

      return this.response.sendResponse(
        'Category Created Successfully.',
        newCategory,
      );
    } catch (err) {
      this.errorHandler.createError('Internal Error', 500);
    }
  }

  // Update Category
  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.crud.update(this.prisma.category, id, updateCategoryDto);
  }
 async findoneCategoriey(id:string){
  try { 
    const category= await this.prisma.category.findUnique({
      where:{id},
      include:{products:true}
   })
   if(!category) throw new BadRequestException("wrong category id")

   return this.response.sendResponse(
    'Category with all products.',
    category,
  );
  }
    
   catch (error) {
    throw error
  }
  
  
}
}
