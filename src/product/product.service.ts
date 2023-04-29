import { Injectable, BadRequestException } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  crud = new CRUD();
  response = new ResponseClass();

  //   Create new products
  async createProduct(createProductDto: any) {
    try {
      const newProduct = await this.prisma.product.create({
        data: { ...createProductDto, inStock: true },
      });

      return this.response.sendResponse(
        'Product Created Successfully.',
        newProduct,
        201,
      );
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  //   Find all Products
  async findAllProducts() {
    return this.response.sendResponse(
      '',
      await this.crud.findAll(this.prisma.product),
      200,
    );
  }

  //   Update product by product ID
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.response.sendResponse(
      'Product Updated Successfully.',
      await this.crud.update(this.prisma.product, id, updateProductDto),
      201,
    );
  }

  //   Find a product by product ID
  async findAProducts(id: string) {
    return this.response.sendResponse(
      '',
      await this.crud.findOne(this.prisma.product, id),
      200,
    );
  }
}
