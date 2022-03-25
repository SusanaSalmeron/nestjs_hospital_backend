import { Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/classes/appointment';

@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name)
    private readonly appointments: Appointment[] = [
        {
            id: 1,
            doctorId: 1,
            patientId: 10000,
            pickedDate: "15/10/2021"
        },
        {
            id: 2,
            doctorId: 1,
            patientId: 10001,
            pickedDate: "20/11/2021"
        },
    ]


    async findAppointmentsByPatient(id: string): Promise<Appointment[]> {
        this.logger.debug(`Searching patient with id : ${id}`)
        const appointments = this.appointments.filter(app => app.patientId.toString() === id)
        if (appointments) {
            this.logger.log(`Showing appointments from patient ${id}`)
        } else {
            this.logger.log(`The patient ${id} has no appointments `)
        }
        return appointments
    }
    async findAppointmentsFromDoctor(id: string): Promise<Appointment[]> {
        this.logger.log(`Searching doctors with id: ${id}`)
        const appointments = this.appointments.filter(app => app.doctorId.toString() === id)
        if (appointments) {
            this.logger.log(`Showing appointments from doctor ${id}`)
        } else {
            this.logger.log(`The doctor ${id} has no appointments `)
        }
        return appointments
    }
}


