import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Patient } from 'src/classes/patient.model';
import { Appointment } from 'src/classes/appointment';
import { Record } from 'src/classes/record';
import { PatientsService } from 'src/services/patients.service';
import { AppointmentsService } from 'src/services/appointments.service';
import { RecordsService } from 'src/services/records.service';


@Controller('patients')
export class PatientsController {
    constructor(private patientService: PatientsService, private appointmentsService: AppointmentsService, private recordsService: RecordsService) { }

    @Get('/')
    @ApiQuery({
        name: 'keyword',
        required: false
    })
    async getPatientsBy(@Query('keyword') keyword: string): Promise<Patient[]> {
        return await this.patientService.findBy(keyword)
    }

    @Get('/:id')
    async getPatientById(@Param('id') id: string): Promise<Patient> {
        return await this.patientService.findById(id)
    }

    @Get('/:id/appointments')
    async getAppointmentsByPatient(@Param('id') id: string): Promise<Appointment[]> {
        return await this.appointmentsService.findAppointmentsByPatient(id)
    }

    @Get('/:id/records')
    async getRecordsByPatient(@Param('id') id: string): Promise<Record[]> {
        return await this.recordsService.findRecordsByPatient(id)
    }
}
