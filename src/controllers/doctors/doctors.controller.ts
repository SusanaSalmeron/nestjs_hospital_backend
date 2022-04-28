import { Controller, Get, HttpStatus, Logger, Param, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorAppointment } from '../../classes/doctorAppointment';
import { AppointmentsService } from '../../services/appointments.service';


@Controller('doctors')
export class DoctorsController {
    private readonly logger = new Logger(AppointmentsService.name)
    constructor(private appointmentsService: AppointmentsService) { }

    @Get('/:id/appointments')
    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({
        description: 'Find doctor appointments successfully',
        type: DoctorAppointment
    })
    @ApiNotFoundResponse({ description: 'Doctor appointments not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    @ApiForbiddenResponse({ description: 'No token found' })
    async getAppointmentsFromDoctor(@Param('id') id: string, @Res() response) {
        try {
            const doctorAppointments = await this.appointmentsService.findAppointmentsFromDoctor(id)
            if (doctorAppointments.length) {
                this.logger.log('Get doctor appointments successfully')
                response.status(HttpStatus.OK)
                response.json(doctorAppointments)
            } else {
                this.logger.log('No appointments')
                response.status(HttpStatus.NOT_FOUND)
                response.send(doctorAppointments)
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.send('Internal Error')
        }
    }
}
