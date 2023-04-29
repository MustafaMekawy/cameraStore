import { Injectable, BadRequestException } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTechDto } from './dtos/create-tech.dto';
import { UpdateTechDto } from './dtos/update-tech.dto';
import { ErrorHandler } from 'src/factory/errorHandler';

@Injectable()
export class TechService {
  constructor(private prisma: PrismaService) {}

  // Declare Objects
  crud = new CRUD();
  response = new ResponseClass();
  error = new ErrorHandler();

  //   Find A Tech by ID
  async findATech(id: string) {
    return this.response.sendResponse(
      '',
      await this.crud.findOne(this.prisma.tech, id),
      200,
    );
  }

  //   Update A Tech by ID
  async updateTech(id: string, updateTechDto: UpdateTechDto) {
    return this.response.sendResponse(
      'Tech Updated Successfully.',
      await this.crud.update(this.prisma.tech, id, updateTechDto),
      202,
    );
  }

  //   Find All Techs
  async findAllTechs() {
    return this.response.sendResponse(
      '',
      await this.crud.findAll(this.prisma.tech),
      200,
    );
  }

  //   Create new Tech
  async createTech(createTechDto: CreateTechDto) {
    try {
      const newTech = await this.prisma.tech.create({
        data: { ...createTechDto },
      });

      return this.response.sendResponse(
        'Tech Assigned Successfully.',
        newTech,
        201,
      );
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }
}
