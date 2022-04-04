import { Controller, Get, HttpStatus, Logger, Param, Res } from '@nestjs/common';
import { DoctorAppointment } from 'src/classes/doctorAppointment';
import { AppointmentsService } from 'src/services/appointments.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';


@Controller('doctors')
export class DoctorsController {
    private readonly logger = new Logger(AppointmentsService.name)
    constructor(private appointmentsService: AppointmentsService) { }

    @Get('/:id/appointments')
    @ApiOkResponse({
        description: 'Find doctor appointments successfully',
        type: DoctorAppointment
    })
    @ApiNotFoundResponse({ description: 'Doctor appointments not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getAppointmentsFromDoctor(@Param('id') id: string, @Res() response): Promise<DoctorAppointment[]> {
        try {
            const doctorAppointments = await this.appointmentsService.findAppointmentsFromDoctor(id)
            if (doctorAppointments.length) {
                this.logger.log('Get doctor appointments successfully')
                return response.status(HttpStatus.OK).json(doctorAppointments)
            } else {
                this.logger.log('No appointments')
                response.status(HttpStatus.NOT_FOUND).send('No appointments')
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Error')
        }
    }
}
