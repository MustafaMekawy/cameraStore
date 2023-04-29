import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateImportedSuplliesDto } from './dtos/create-importedSupplies.dto';
import { ImportedSuppliesService } from './imported-supplies.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('importedsupplies')
export class ImportedSuppliesController {
  constructor(private importedSuppliesService: ImportedSuppliesService) {}

  // Create new product
  @Roles('admin', RolesEnum.Employee)
  @Post()
  createImportedSupply(
    @Body() createImportedSuplliesDto: CreateImportedSuplliesDto,
  ) {
    return this.importedSuppliesService.createImportedSupply(
      createImportedSuplliesDto,
    );
  }

  //   Get all products
  @Roles('admin', RolesEnum.Employee)
  @Get()
  findAllImportedSupply() {
    return this.importedSuppliesService.findAllImportedSupply();
  }
}
