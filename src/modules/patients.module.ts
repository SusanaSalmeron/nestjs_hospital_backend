import { Module } from '@nestjs/common';
import { DoctorsController } from '../controllers/doctors/doctors.controller';
import { PatientsController } from '../controllers/patients/patients.controller';
import { DatabaseModule } from '../database/database.module';
import { AppointmentsService } from '../services/appointments.service';
import { DoctorsService } from '../services/doctors.service';
import { PatientsService } from '../services/patients.service';
import { RecordsService } from '../services/records.service'

@Module({
    providers: [PatientsService, AppointmentsService, RecordsService, DoctorsService],
    controllers: [PatientsController, DoctorsController],
    imports: [DatabaseModule]
})
export class PatientsModule { }
