import { Module } from '@nestjs/common';
import { DiseasesService } from '../services/diseases.service';
import { DoctorsService } from '../services/doctors.service';
import { CatalogController } from '../controllers/catalogs/catalogs.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    providers: [DiseasesService, DoctorsService],
    controllers: [CatalogController],
    imports: [DatabaseModule]
})
export class CatalogModule { }
