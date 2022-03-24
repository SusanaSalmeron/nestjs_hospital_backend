import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './services/users.service'
import { CatalogController } from './controllers/catalog/catalog.controller';
import { DiseasesService } from './services/diseases.service';
import { DoctorsService } from './services/doctors.service';
import { CatalogModule } from './modules/catalog.module';
import { PatientsModule } from './modules/patients.module';
import { PatientsService } from './services/patients.service';
import { PatientsController } from './controllers/patients/patients.controller';

@Module({
  imports: [CatalogModule, PatientsModule],
  controllers: [AppController, CatalogController, PatientsController],
  providers: [AppService, UsersService, DiseasesService, DoctorsService, PatientsService],
})
export class AppModule { }
