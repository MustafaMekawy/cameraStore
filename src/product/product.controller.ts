import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreatePoroductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product')
@Roles('admin', RolesEnum.Employee)
export class ProductController {
  constructor(private productService: ProductService) {}

  // Create new product
  @Post()
  createProduct(@Body() createProductDto: CreatePoroductDto) {
    return this.productService.createProduct(createProductDto);
  }

  //   Get all products
  @Roles('admin', RolesEnum.Employee)
  @Get()
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  //   Update a product by product ID
  @Roles('admin', RolesEnum.Employee)
  @Post('update/:id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  //   Get a single product by product ID
  @Roles('admin', RolesEnum.Employee)
  @Get(':id')
  findAProducts(@Param('id') id: string) {
    return this.productService.findAProducts(id);
  }
}
