import { Inject, Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/classes/appointment';
import { DoctorAppointment } from 'src/classes/doctorAppointment'
import * as loki from 'lokijs'
import { Patient } from 'src/classes/patient.model';


@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findAppointmentsByPatient(id: string): Promise<Appointment[]> {
        this.logger.debug(`Searching patient with id : ${id}`)
        const patientsTable = this.db.getCollection('patients')
        try {
            const patient: Patient = patientsTable.findOne({ id: { '$eq': parseInt(id) } })
            if (!patient) {
                this.logger.log(`Patient id ${id} doesn't exist`)
                return null;
            }
            this.logger.log(`Fetching appointments from patient ${id}`)
            const appointmentsTable = this.db.getCollection('appointments')
            const doctorsTable = this.db.getCollection('doctors')
            const appoints: any[] = appointmentsTable.find({ patientId: { '$eq': parseInt(id) } })
            if (appoints.length === 0) {
                this.logger.log(`The patient ${id} has no appointments `)
            }
            return appoints.map(app => {
                //TODO es posible que no existe el doctor?
                const doc = doctorsTable.findOne({ id: app.doctorId })
                return new Appointment(
                    app.id,
                    app.pickedDate,
                    doc.name,
                    doc.id
                )
            })
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


