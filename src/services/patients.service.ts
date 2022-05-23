import { Inject, Injectable, Logger } from '@nestjs/common';
import { Patient } from '../classes/patient';
import { PatientToShow } from '../classes/patientToShow';
import * as loki from 'lokijs'


@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findBy(keyword = ""): Promise<PatientToShow[]> {
        const patientsTable = this.db.getCollection('patients')
        const clinicalRecordsTable = this.db.getCollection('clinicalRecords')
        let foundPatients: PatientToShow[] = []
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
            const patients = patientsTable.find(true)
            const patientsDiagnostics = patients.map(patient => {
                const records = clinicalRecordsTable.find({ id: patient.id })
                const lastDiagnostics = records.length >= 1 ? records[0].diagnostics : "none"
                patient.diagnostics = lastDiagnostics
                return new PatientToShow(
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
                    patient.company,
                    patient.diagnostics
                )
            })

            return patientsDiagnostics
        }
        let otherPatients = []
        let records = []
        try {
            this.logger.log('Getting all clinicalRecords')
            records = clinicalRecordsTable.find({ diagnostics: { '$regex': [keyword, 'i'] } })
            otherPatients = records.map(record => patientsTable.findOne({ id: record.id }))
        } catch (err) {
            console.log(err)
        }
        const filteredPatient = foundPatients.concat(otherPatients)
        return filteredPatient.map(fp => {
            return new PatientToShow(
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
                fp.company,
                fp.diagnostics
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
            return null
        }
    }

    async addPatientToDB(name, address, email, postalZip, region, country, phone, id, dob, ssnumber, company): Promise<boolean> {
        const patientTable = this.db.getCollection('patients')
        patientTable.insert({
            name: name,
            address: address,
            email: email,
            postalZip: postalZip,
            region: region,
            country: country,
            phone: phone,
            id: id,
            dob: dob,
            ssnumber: ssnumber,
            company: company
        })
        return true
    }

    async modifyPatientData(id, name, email, address, postalZip, region, country, phone, ssnumber, company): Promise<boolean> {
        const patientTable = this.db.getCollection('patients')
        const patient = patientTable.findOne({ id: parseInt(id) })
        if (!patient) {
            return false
        }
        patient.name = name
        patient.email = email
        patient.address = address
        patient.postalZip = postalZip
        patient.region = region
        patient.country = country
        patient.phone = phone
        patient.ssnumber = ssnumber
        patient.company = company
        return patientTable.update(patient)
    }
}
