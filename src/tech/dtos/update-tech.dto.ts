import { PartialType } from '@nestjs/mapped-types';
import { CreateTechDto } from './create-tech.dto';

export class UpdateTechDto extends PartialType(CreateTechDto) {}
