import { Inject, Injectable, Logger } from '@nestjs/common';
import { Record } from 'src/classes/record';
import { ClinicalRecord } from 'src/classes/clinicalRecord';
import * as loki from 'lokijs';
import * as dayjs from 'dayjs';
import { Patient } from 'src/classes/patient.model';
import { PatientsService } from './patients.service';
import { CreateRecordDto } from 'src/dto/createRecordDto';


@Injectable()
export class RecordsService {
    private readonly logger = new Logger(RecordsService.name)
    private recordId = 41
    constructor(@Inject('DATABASE_CONNECTION') private db: loki, private PatientService: PatientsService) { }

    async findRecordsByPatient(patientId: string): Promise<ClinicalRecord> {
        const patient: Patient = await this.PatientService.findById(patientId)
        if (patient) {
            const clinicalRecordTable = this.db.getCollection('clinicalRecords')
            this.logger.debug(`Searching patient with id ${patientId}`)
            const records = clinicalRecordTable.find({ id: parseInt(patientId) })
            return new ClinicalRecord(
                patient.name,
                patient.address,
                patient.company,
                patient.dob,
                records.map(r => {
                    return new Record(
                        r.recordId,
                        r.date,
                        r.id,
                        r.description,
                        r.diagnostics
                    )
                })
            )
        }
        return null
    }

    async addNewRecord(id, createRecordDto: CreateRecordDto): Promise<boolean> {
        const patient = await this.PatientService.findById(id)
        if (patient) {
            const recordsTable = this.db.getCollection('clinicalRecords')
            const newRecordId: number = this.recordId++
            const newDate = dayjs().format('DD-MM-YYYY')
            recordsTable.insert({
                recordId: newRecordId,
                id: parseInt(id),
                diagnostics: createRecordDto.diagnostics,
                description: createRecordDto.description,
                date: newDate
            })
            return true
        }
        return false
    }
}
