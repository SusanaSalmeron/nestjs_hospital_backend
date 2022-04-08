import { Inject, Injectable, Logger } from '@nestjs/common';
import { Appointment } from 'src/classes/appointment';
import { CreateAppointmentDto } from 'src/dto/createAppointmentDto';
import { DoctorAppointment } from 'src/classes/doctorAppointment'
import * as loki from 'lokijs'
import { Patient } from 'src/classes/patient.model';
import { PatientsService } from 'src/services/patients.service';
import { DeleteAppointDto } from 'src/dto/deleteAppointDto';
import { Doctor } from 'src/classes/doctor';



@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name)
    private appointmentId = 1000
    constructor(@Inject('DATABASE_CONNECTION') private db: loki, private PatientService: PatientsService) { }

    async findAppointmentsByPatient(id: string): Promise<Appointment[]> {
        this.logger.debug(`Searching patient with id : ${id}`)
        const patientsTable = this.db.getCollection('patients')
        try {
            const patient: Patient = patientsTable.findOne({ id: { '$eq': parseInt(id) } })
            if (!patient) {
                this.logger.error(`Patient id ${id} doesn't exist`)
                return null;
            }
            this.logger.log(`Fetching appointments from patient ${id}`)
            const appointmentsTable = this.db.getCollection('appointments')
            const doctorsTable = this.db.getCollection('doctors')
            const appoints: Appointment[] = appointmentsTable.find({ patientId: { '$eq': parseInt(id) } })
            if (appoints.length === 0) {
                this.logger.log(`The patient ${id} has no appointments `)
            }
            return appoints.map(app => {
                //TODO es posible que no existe el doctor?
                const doc: Doctor = doctorsTable.findOne({ id: app.doctorId })
                return new Appointment(
                    app.id,
                    app.pickedDate,
                    doc.name,
                    doc.id
                )
            })
        } catch (err) {
            this.logger.error('Internal Server Error', err)
        }
        return null
    }

    async findAppointmentsFromDoctor(id: string): Promise<DoctorAppointment[]> {
        this.logger.log(`Searching doctors with id: ${id}`)
        const appointmentsTable = this.db.getCollection('appointments')
        const appoints: DoctorAppointment[] = appointmentsTable.find({ doctorId: parseInt(id) })
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
            this.logger.error('Internal Server Error', err)
        }
    }

    async createNewAppointment(patientId: string, createAppDto: CreateAppointmentDto): Promise<number> {
        const patient: Patient = await this.PatientService.findById(patientId)
        const doctorTable = this.db.getCollection('doctors')
        const doctor: Doctor = doctorTable.findOne({ id: createAppDto.doctorId })
        if (patient && doctor) {
            const appointmentsTable = this.db.getCollection('appointments')
            const newId: number = this.appointmentId++
            appointmentsTable.insert({
                id: newId,
                patientId: parseInt(patientId),
                pickedDate: createAppDto.pickedDate,
                doctorId: createAppDto.doctorId
            })
            return newId
        }
        return null
    }

    async deleteAppointment(deleteAppointDto: DeleteAppointDto): Promise<boolean> {
        const appointmentTable = this.db.getCollection('appointments')
        const appoint = appointmentTable.findOne({ id: parseInt(deleteAppointDto.appId) })
        if (!appoint) {
            return false
        }
        if (appoint.patientId === parseInt(deleteAppointDto.id)) {
            appointmentTable.remove(appoint)
            return true
        }
        return false
    }
}


