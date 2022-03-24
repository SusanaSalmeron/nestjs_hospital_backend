import { Injectable, Logger } from '@nestjs/common';
import { Patient } from 'src/classes/patient';

@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name)
    private readonly patients:
        Patient[] = [
            {
                name: "Lee Hunter",
                address: "P.O. Box 470, 6508 Elit, Av.",
                email: "curabitur.ut@orciluctus.net",
                postalZip: "5641",
                region: "Leinster",
                country: "Turkey",
                phone: "(817) 506-2472",
                id: 10000,
                dob: "30-11-1917",
                ssnumber: "7423256SL",
                company: "Risus At Fringilla Incorporated"
            },
            {
                name: "Allistair Diaz",
                address: "1213 Et, Rd.",
                email: "commodo.tincidunt.nibh@acmattis.com",
                postalZip: "18331",
                region: "Balochistan",
                country: "Australia",
                phone: "1-252-310-3021",
                id: 10001,
                dob: "11-01-1941",
                ssnumber: "1173222DE",
                company: "Ultricies Adipiscing Enim LLP"
            }
        ]

    async findBy(keyword = ""): Promise<Patient[]> {
        const lowerKeyword = keyword.toLowerCase()
        if (keyword) {
            this.logger.log('Getting patients by keyword')
            return this.patients.filter((p) =>
                p.name.toLowerCase().includes(lowerKeyword) || p.address.toLowerCase().includes(lowerKeyword) || p.email.toLowerCase().includes(lowerKeyword) || p.postalZip.includes(lowerKeyword) || p.region.toLowerCase().includes(lowerKeyword) || p.country.toLowerCase().includes(lowerKeyword) || p.phone.includes(lowerKeyword) || p.dob.includes(lowerKeyword) || p.ssnumber.toLowerCase().includes(lowerKeyword) || p.company.toLowerCase().includes(lowerKeyword))
        } else {
            this.logger.log('Getting all patients')
            return this.patients
        }
    }

    async findById(id: string): Promise<Patient> {
        this.logger.debug(`Searching patient with id : ${id}`)
        const patient: Patient = this.patients.find((p) => p.id.toString() === id)
        if (patient) {
            this.logger.log(`Getting patient with id ${id}`)
        } else {
            this.logger.log('No patient with this id')
        }
        return patient
    }
}
