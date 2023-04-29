import { Module } from '@nestjs/common';
import { ResponseClass } from 'src/factory/response';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
