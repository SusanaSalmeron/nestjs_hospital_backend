import { Controller, Get, Param } from '@nestjs/common';
import { DoctorAppointment } from 'src/classes/doctorAppointment';
import { AppointmentsService } from 'src/services/appointments.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private appointmentsService: AppointmentsService) { }

    @Get('/:id/appointments')
    async getAppointmentsFromDoctor(@Param('id') id: string): Promise<DoctorAppointment[]> {
        return await this.appointmentsService.findAppointmentsFromDoctor(id)
    }
}
