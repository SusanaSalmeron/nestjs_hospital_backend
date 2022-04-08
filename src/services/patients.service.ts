import { Inject, Injectable, Logger } from '@nestjs/common';
import { Patient } from 'src/classes/patient.model';
import * as loki from 'lokijs'


@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findBy(keyword = ""): Promise<Patient[]> {
        const patientsTable = this.db.getCollection('patients')
        let foundPatients: Patient[] = []
        if (keyword) {
            this.logger.log('Getting patients by keyword')
            foundPatients = patientsTable.find({
                '$or': [
                    { address: { '$regex': [keyword, 'i'] } },
                    { name: { '$regex': [keyword, 'i'] } },
                    { email: { '$regex': [keyword, 'i'] } },
                    { postalZip: { '$contains': keyword } },
                    { region: { '$regex': [keyword, 'i'] } },
                    { country: { '$regex': [keyword, 'i'] } },
                    { phone: { '$contains': keyword } }
                ]
            })
        } else {
            this.logger.log('Getting all patients')
            return patientsTable.find(true)
        }
        const clinicalRecordsTable = this.db.getCollection('clinicalRecords')
        let otherPatients = []
        try {
            this.logger.log('Getting all clinicalRecords')
            const records = clinicalRecordsTable.find({ diagnostics: { '$regex': [keyword, 'i'] } })
            otherPatients = records.map(record => patientsTable.findOne({ id: record.id }))
        } catch (err) {
            console.log(err)
        }
        const filteredPatient = foundPatients.concat(otherPatients)
        return filteredPatient.map(fp => {
            return new Patient(
                fp.name,
                fp.address,
                fp.email,
                fp.postalZip,
                fp.region,
                fp.country,
                fp.phone,
                fp.id,
                fp.dob,
                fp.ssnumber,
                fp.company
            )
        })
    }

    async findById(id: string): Promise<Patient> {
        this.logger.debug(`Searching patient with id : ${id}`)
        const patientTable = this.db.getCollection('patients')
        const patient = patientTable.findOne({ id: parseInt(id) })
        if (patient) {
            this.logger.log(`Getting patient with id ${id}`)
            return new Patient(
                patient.name,
                patient.address,
                patient.email,
                patient.postalZip,
                patient.region,
                patient.country,
                patient.phone,
                patient.id,
                patient.dob,
                patient.ssnumber,
                patient.company
            )
        } else {
            this.logger.log('No patient with this id')
        }
    }
}
