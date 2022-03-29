import { Inject, Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/classes/appointment';
import { DoctorAppointment } from 'src/classes/doctorAppointment'
import * as loki from 'lokijs'


@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findAppointmentsByPatient(id: string): Promise<Appointment[]> {
        this.logger.debug(`Searching patient with id : ${id}`)
        let appoints: any[] = []
        const appointmentsTable = this.db.getCollection('appointments')
        const doctorsTable = this.db.getCollection('doctors')
        try {
            if (appoints) {
                this.logger.log(`Showing appointments from patient ${id}`)
                appoints = appointmentsTable.find({ patientId: { '$eq': parseInt(id) } })
                return appoints.map(app => {
                    const doc = doctorsTable.findOne({ id: app.doctorId })
                    return new Appointment(
                        app.id,
                        app.pickedDate,
                        doc.name,
                        doc.id
                    )
                })
            } else {
                this.logger.log(`The doctor ${id} has no appointments `)
            }
        } catch (err) {
            console.log(err)
        }
        return null
    }

    async findAppointmentsFromDoctor(id: string): Promise<DoctorAppointment[]> {
        this.logger.log(`Searching doctors with id: ${id}`)
        const appointmentsTable = this.db.getCollection('appointments')
        const appoints = appointmentsTable.find({ doctorId: parseInt(id) })
        const patientTable = this.db.getCollection('patients')
        try {
            if (appoints) {
                return appoints.map(appoint => {
                    this.logger.log(`Showing appointments from doctor ${id}`)
                    return new DoctorAppointment(
                        appoint.id,
                        appoint.doctorId,
                        appoint.patientId,
                        patientTable.findOne({ id: appoint.patientId }).name,
                        appoint.pickedDate
                    )
                })
            } else {
                this.logger.log(`The doctor ${id} has no appointments `)
            }
        } catch (err) {
            console.log(err)
        }
    }
}


