import { Module } from '@nestjs/common';
import { DiseasesService } from 'src/services/diseases.service';
import { DoctorsService } from 'src/services/doctors.service';
import { CatalogController } from 'src/controllers/catalogs/catalogs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    providers: [DiseasesService, DoctorsService],
    controllers: [CatalogController],
    imports: [DatabaseModule]
})
export class CatalogModule { }
