import { Module } from '@nestjs/common';
import { DiseasesService } from 'src/services/diseases.service';
import { DoctorsService } from 'src/services/doctors.service';
import { CatalogController } from 'src/controllers/catalog/catalog.controller';

@Module({
    providers: [DiseasesService, DoctorsService],
    controllers: [CatalogController],
})
export class CatalogModule { }
