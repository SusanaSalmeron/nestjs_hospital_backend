import { Inject, Injectable, Logger } from '@nestjs/common';
import { Doctor } from '../classes/doctor';
import * as loki from 'lokijs'

@Injectable()
export class DoctorsService {
    private readonly logger = new Logger(DoctorsService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findAll(): Promise<Doctor[]> {
        this.logger.log('Getting doctors')
        const doctorsTable = this.db.getCollection('doctors')
        const doctors = doctorsTable.find(true)
        return doctors.map(doctor => {
            return new Doctor(
                doctor.id,
                doctor.name,
                doctor.email,
                doctor.speciality,
                doctor.photo
            )
        })
    }
}