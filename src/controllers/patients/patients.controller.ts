import { Controller, Get, Query, Param, Res, Req, Logger, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { ApiQuery, ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBody, ApiForbiddenResponse } from '@nestjs/swagger';
import { Patient } from 'src/classes/patient.model';
import { Record } from 'src/classes/record';
import { PatientsService } from 'src/services/patients.service';
import { AppointmentsService } from 'src/services/appointments.service';
import { RecordsService } from 'src/services/records.service';
import { CreateAppointmentDto } from 'src/dto/createAppointmentDto';
import { DeleteAppointDto } from 'src/dto/deleteAppointDto';
import { CreateRecordDto } from 'src/dto/createRecordDto';
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

    @Post('/:id/appointments')
    @ApiBody({
        description: 'Appointment',
        required: true,
        type: CreateAppointmentDto
    })
    @ApiCreatedResponse({ description: "Appointment Created" })
    @ApiNotFoundResponse({ description: "Patient Not Found" })
    @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
    async addAppointment(@Param('id') id: string, @Res() response, @Body() createAppDto: CreateAppointmentDto) {
        try {
            const appointmentId = await this.appointmentsService.createNewAppointment(id, createAppDto)
            if (appointmentId) {
                this.logger.log('Appointment added successfully')
                response.status(HttpStatus.CREATED).send()
            } else {
                this.logger.error('No Appointment')
                response.status(HttpStatus.NOT_FOUND).json({ error: 'The patient id or the doctor id does not exists' })
            }
        } catch (err) {
            this.logger.error('Internal Server Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Error" })
        }
    }

    @Delete('/:id/appointments/:appId')
    @ApiOkResponse({
        description: 'Appointment deleted successfully',
    })
    @ApiNotFoundResponse({ description: 'Appointment does not exists' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async eraseAppointment(@Param() deleteAppointDto: DeleteAppointDto, @Res() response) {
        try {
            const appointmentDeleted = await this.appointmentsService.deleteAppointment(deleteAppointDto)
            if (appointmentDeleted) {
                this.logger.log('Appointment deleted successfully')
                response.status(HttpStatus.OK).send()
            } else {
                this.logger.error('Appointment does not exists')
                response.status(HttpStatus.NOT_FOUND).json({ error: 'Appointment does not exists' })
            }
        } catch (err) {
            this.logger.error('Internal Server Error')
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }

    @Get('/:id/records')
    @ApiOkResponse({
        description: 'Find records successfully',
        type: Record
    })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getRecordsByPatient(@Param('id') id: string, @Res() response) {
        try {
            const clinicalRecords = await this.recordsService.findRecordsByPatient(id)
            if (clinicalRecords) {
                this.logger.debug('Records find successfully')
                response.status(HttpStatus.OK).json(clinicalRecords)
            } else {
                this.logger.error('Not found')
                response.status(HttpStatus.NOT_FOUND).json({ result: null })
            }
        } catch (err) {
            this.logger.error('Internal Server Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
        }
    }

    //TODO - Autenticate Token and authorize doctor pending
    @Post('/:id/records')
    @ApiBody({
        description: 'Record',
        required: true,
        type: CreateRecordDto
    })
    @ApiOkResponse({ description: 'New record create successfully' })
    @ApiNotFoundResponse({ description: 'Patient not found' })
    @ApiInternalServerErrorResponse({ description: '' })
    @ApiForbiddenResponse({ description: "Current role is not authorized" })
    async createNewRecord(@Param('id') id: string, @Res() response, @Req() request, @Body() createRecordDto: CreateRecordDto) {
        if (request.role === "sanitario") {
            try {
                const recordAdded = await this.recordsService.addNewRecord(id, createRecordDto)
                if (recordAdded) {
                    this.logger.log('Record added successfully')
                    response.status(HttpStatus.CREATED).json(recordAdded)
                } else {
                    this.logger.error('Patient not found')
                    response.status(HttpStatus.NOT_FOUND).json({ error: 'Patient not found' })
                }
            } catch (err) {
                this.logger.error('Internal Server Error', err)
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" })
            }
        } else {
            this.logger.error('Forbidden')
            response.status(HttpStatus.FORBIDDEN).json({ error: "Forbidden" })
        }
    }
}
