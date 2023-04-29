import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CreateTechDto } from './dtos/create-tech.dto';
import { UpdateTechDto } from './dtos/update-tech.dto';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  constructor(private techService: TechService) {}

  // Create new product
  @Post()
  createTech(@Body() createTechDto: CreateTechDto) {
    return this.techService.createTech(createTechDto);
  }

  //   Get all products
  @Roles('admin', RolesEnum.Employee)
  @Get()
  findAllTechs() {
    return this.techService.findAllTechs();
  }

  //   Update a product by product ID
  @Roles('admin', RolesEnum.Employee)
  @Post('update/:id')
  updateTech(@Body() updateTechDto: UpdateTechDto, @Param('id') id: string) {
    return this.techService.updateTech(id, updateTechDto);
  }

  //   Get a single product by product ID
  @Roles('admin', RolesEnum.Employee)
  @Get(':id')
  findATecg(@Param('id') id: string) {
    return this.techService.findATech(id);
  }
}
