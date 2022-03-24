import { Module } from '@nestjs/common';
import { PatientsController } from 'src/controllers/patients/patients.controller';
import { PatientsService } from 'src/services/patients.service';

@Module({
    providers: [PatientsService],
    controllers: [PatientsController]
})
export class PatientsModule { }
