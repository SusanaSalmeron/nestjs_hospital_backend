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
import { ValidationService } from './services/validation.service';
import { ManagementService } from './services/management.service';
import { TokenService } from './services/token.service';
import { DoctorsController } from './controllers/doctors/doctors.controller';
import { UsersController } from './controllers/users/users.controller';
import { ManagementController } from './controllers/management/management.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users.module';
import { ManagementModule } from './modules/management.module';
import { AuthenticateTokenMiddleware } from './middlewares/authenticateToken.middleware';
import { CheckLoginTokenMiddleware } from './middlewares/checkLoginToken.middleware';
import { AuthorizeDoctorMiddleware } from './middlewares/authorize-doctor.middleware';
import { ValidateDateMiddleware } from './middlewares/validate-date.middleware';
import { EmailService } from './services/email.service';


@Module({
  imports: [ConfigModule.forRoot(), CatalogModule, PatientsModule, DatabaseModule, UsersModule, ManagementModule],
  controllers: [AppController, CatalogController, PatientsController, DoctorsController, UsersController, ManagementController],
  providers: [AppService, UsersService, DiseasesService, DoctorsService, PatientsService, AppointmentsService, RecordsService, TokenService, ValidationService, ManagementService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateTokenMiddleware)
      .exclude(
        '(.*)/login',
        { path: 'v1/catalogs/doctors', method: RequestMethod.ALL },
        { path: 'v1/catalogs/diseases', method: RequestMethod.ALL },
        { path: 'v1/users/register', method: RequestMethod.ALL },
        { path: 'v1/management/contact', method: RequestMethod.ALL }
      )
      .forRoutes('/')
    consumer.apply(ValidateDateMiddleware)
      .forRoutes(
        { path: 'v1/patients/:id/appointments', method: RequestMethod.POST }
      )
    consumer.apply(AuthorizeDoctorMiddleware)
      .forRoutes(
        { path: 'v1/doctors/:id/appointments', method: RequestMethod.GET },
        { path: 'v1/patients', method: RequestMethod.GET },
        { path: 'v1/patients/:id/records', method: RequestMethod.ALL }
      )
    consumer.apply(CheckLoginTokenMiddleware)
      .forRoutes({ path: 'v1/users/login', method: RequestMethod.POST })
  }
}
