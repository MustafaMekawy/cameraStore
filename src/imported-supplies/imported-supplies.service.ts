import { Injectable, BadRequestException } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ErrorHandler } from 'src/factory/errorHandler';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImportedSuplliesDto } from './dtos/create-importedSupplies.dto';

@Injectable()
export class ImportedSuppliesService {
  constructor(private prisma: PrismaService) {}

  // Declare Objects
  crud = new CRUD();
  response = new ResponseClass();
  error = new ErrorHandler();

  // Create new Imported Supply
  async createImportedSupply(
    createImportedSuplliesDto: CreateImportedSuplliesDto,
  ) {
    try {
      const creationDate = new Date(Date.now());

      const durationN = this.returnDateCalculator(
        creationDate,
        createImportedSuplliesDto.duration,
      );
      // console.log(durationN);

      const office = await this.prisma.user.findFirst({
        where: {
          serialNo: createImportedSuplliesDto.officeId,
        },
      });

      // console.log(office);
      if (!office) this.error.createError('Wrong Office ID!', 404);

      const newSupply = await this.prisma.importedSupplies.create({
        data: {
          name: createImportedSuplliesDto.name,
          price: createImportedSuplliesDto.price,
          officeId: createImportedSuplliesDto.officeId,
          date: new Date(Date.now()),
          duration: createImportedSuplliesDto.duration,
          returnDate: durationN.returnDate,
          code: Date.now().toString(),
        },
      });

      return this.response.sendResponse(
        'Imported Suplly Created Successfully.',
        newSupply,
        201,
      );
    } catch (err) {
      throw err;
    }
  }

  // Find All Imported Supplies
  async findAllImportedSupply() {
    const importedSupplies = await this.crud.findAll(
      this.prisma.importedSupplies,
    );

    return this.response.sendResponse('Success', importedSupplies, 200);
  }

  // Return Date Calculator
  returnDateCalculator(
    creationDate: Date,
    durationStr: string,
  ): { returnDate: Date } {
    // Extract duration delimter (d / m / y)
    const delimter = durationStr.slice(
      durationStr.length - 1,
      durationStr.length,
    );

    // console.log(creationDate);

    // Extract duration number
    const durationNum = +durationStr.slice(0, durationStr.length - 1);

    // Calculate the return data
    switch (delimter) {
      case 'd': {
        const duration = creationDate.setDate(
          creationDate.getDate() + durationNum,
        );
        return { returnDate: new Date(duration) };
      }

      case 'm': {
        const duration = creationDate.setMonth(
          creationDate.getMonth() + durationNum,
        );
        return { returnDate: new Date(duration) };
      }

      case 'y': {
        const duration = creationDate.setFullYear(
          creationDate.getFullYear() + durationNum,
        );
        // console.log(new Date(duration), durationStr);
        return { returnDate: new Date(duration) };
      }
    }
  }
}
