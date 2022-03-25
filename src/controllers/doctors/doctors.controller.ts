import { Controller, Get, Param } from '@nestjs/common';
import { Appointment } from 'src/classes/appointment';
import { AppointmentsService } from 'src/services/appointments.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private appointmentsService: AppointmentsService) { }

    @Get('/:id/appointments')
    async getAppointmentsFromDoctor(@Param('id') id: string): Promise<Appointment[]> {
        return await this.appointmentsService.findAppointmentsFromDoctor(id)
    }
}
