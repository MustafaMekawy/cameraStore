import { Module } from '@nestjs/common';
import { ImportedSuppliesController } from './imported-supplies.controller';
import { ImportedSuppliesService } from './imported-supplies.service';

@Module({
  controllers: [ImportedSuppliesController],
  providers: [ImportedSuppliesService]
})
export class ImportedSuppliesModule {}
