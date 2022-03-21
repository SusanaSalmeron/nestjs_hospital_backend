import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './services/users.service'
import { CatalogController } from './controllers/catalog/catalog.controller';
import { DiseasesService } from './services/diseases.service';
import { DoctorsService } from './services/doctors.service';
import { CatalogModule } from './modules/catalog.module';

@Module({
  imports: [CatalogModule],
  controllers: [AppController, CatalogController],
  providers: [AppService, UsersService, DiseasesService, DoctorsService],
})
export class AppModule { }
