import { Module } from '@nestjs/common';
import { PatientsController } from 'src/controllers/patients/patients.controller';
import { AppointmentsService } from 'src/services/appointments.service';
import { PatientsService } from 'src/services/patients.service';

@Module({
    providers: [PatientsService, AppointmentsService],
    controllers: [PatientsController]
})
export class PatientsModule { }
