import { Module } from '@nestjs/common';
import { DoctorsController } from 'src/controllers/doctors/doctors.controller';
import { PatientsController } from 'src/controllers/patients/patients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppointmentsService } from 'src/services/appointments.service';
import { DoctorsService } from 'src/services/doctors.service';
import { PatientsService } from 'src/services/patients.service';
import { RecordsService } from 'src/services/records.service'

@Module({
    providers: [PatientsService, AppointmentsService, RecordsService, DoctorsService],
    controllers: [PatientsController, DoctorsController],
    imports: [DatabaseModule]
})
export class PatientsModule { }
