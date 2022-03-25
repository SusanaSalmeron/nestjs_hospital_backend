import { Controller, Get, Query, Param } from '@nestjs/common';
import { Patient } from 'src/classes/patient';
import { PatientsService } from 'src/services/patients.service';
import { AppointmentsService } from 'src/services/appointments.service';
import { ApiQuery } from '@nestjs/swagger';
import { Appointment } from 'src/classes/appointment';


@Controller('patients')
export class PatientsController {
    constructor(private patientService: PatientsService, private appointmentService: AppointmentsService) { }

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
        return await this.appointmentService.findAppointmentsByPatient(id)
    }
}
