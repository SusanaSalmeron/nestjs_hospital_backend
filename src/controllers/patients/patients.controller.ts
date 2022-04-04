import { Controller, Get, Query, Param, Res, Logger, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Patient } from 'src/classes/patient.model';
import { Record } from 'src/classes/record';
import { PatientsService } from 'src/services/patients.service';
import { AppointmentsService } from 'src/services/appointments.service';
import { RecordsService } from 'src/services/records.service';
import { Appointment } from 'src/classes/appointment';


@Controller('patients')
export class PatientsController {
    private readonly logger = new Logger(PatientsController.name)
    constructor(private patientService: PatientsService, private appointmentsService: AppointmentsService, private recordsService: RecordsService) { }

    @Get('/')
    @ApiQuery({
        name: 'keyword',
        required: false
    })
    @ApiOkResponse({
        description: 'Find patients successfully',
        type: Patient
    })
    @ApiNotFoundResponse({ description: 'Patients not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getPatientsBy(@Query('keyword') keyword: string, @Res() response) {
        try {
            const patients = await this.patientService.findBy(keyword)
            if (patients.length) {
                this.logger.debug('Find patients successfully')
                response.status(HttpStatus.OK).json(patients)
            } else {
                this.logger.error('Patients not found')
                response.status(HttpStatus.NOT_FOUND).send('Patients not found')
            }
        } catch (err) {
            this.logger.error('Internal Server Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
        }
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Find patient successfully',
        type: Patient
    })
    @ApiNotFoundResponse({ description: 'Patient not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getPatientById(@Param('id') id: string, @Res() response) {
        try {
            const patient = await this.patientService.findById(id)
            if (patient) {
                this.logger.debug('Find Patient successfully')
                response.status(HttpStatus.OK).json(patient)
            } else {
                this.logger.error('Patient not found')
                response.status(HttpStatus.NOT_FOUND).send('Patient Not Found')
            }
        } catch (err) {
            this.logger.error('Internal Server Error')
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error', err)
        }
    }

    @Get('/:id/appointments')
    @ApiOkResponse({
        description: 'find appointments successfully',
        type: Appointment
    })
    @ApiNotFoundResponse({ description: 'appointments not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getAppointmentsByPatient(@Param('id') id: string, @Res() response) {
        try {
            const appointments = await this.appointmentsService.findAppointmentsByPatient(id)
            if (appointments.length) {
                this.logger.debug('find appointments successfully')
                response.status(HttpStatus.OK).json(appointments)
            } else {
                this.logger.error('appointments not found')
                response.status(HttpStatus.NOT_FOUND).send('appointments not found')
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal error')

        }
    }

    @Get('/:id/records')
    @ApiOkResponse({
        description: 'Find records successfully',
        type: Record
    })
    @ApiNotFoundResponse({ description: 'Record not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getRecordsByPatient(@Param('id') id: string, @Res() response) {
        try {
            const records = await this.recordsService.findRecordsByPatient(id)
            if (records.length) {
                this.logger.debug('Records find successfully')
                response.status(HttpStatus.OK).json(records)
            } else {
                this.logger.error('Records not found')
                response.status(HttpStatus.NOT_FOUND).send('Records not found')
            }
        } catch (err) {
            this.logger.error('Internal Server Error')
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
        }
    }
}
