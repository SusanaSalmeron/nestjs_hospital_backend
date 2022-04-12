import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './services/users.service'
import { CatalogController } from './controllers/catalogs/catalogs.controller';
import { DiseasesService } from './services/diseases.service';
import { DoctorsService } from './services/doctors.service';
import { CatalogModule } from './modules/catalog.module';
import { PatientsModule } from './modules/patients.module';
import { PatientsService } from './services/patients.service';
import { PatientsController } from './controllers/patients/patients.controller';
import { AppointmentsService } from './services/appointments.service';
import { RecordsService } from './services/records.service';
import { DoctorsController } from './controllers/doctors/doctors.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users.module';
import { UsersController } from './controllers/users/users.controller';
import { TokenService } from './services/token.service';
import { AuthenticateTokenMiddleware } from './middlewares/authenticateToken.middleware';


@Module({
  imports: [ConfigModule.forRoot(), CatalogModule, PatientsModule, DatabaseModule, UsersModule],
  controllers: [AppController, CatalogController, PatientsController, DoctorsController, UsersController],
  providers: [AppService, UsersService, DiseasesService, DoctorsService, PatientsService, AppointmentsService, RecordsService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateTokenMiddleware)
      .exclude(
        { path: 'v1/user/login', method: RequestMethod.ALL },
        { path: 'v1/catalogs/doctors', method: RequestMethod.ALL })
      .forRoutes('/')
  }
}
