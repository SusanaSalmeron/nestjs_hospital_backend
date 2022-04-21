import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateContactUsDto } from 'src/dto/createContactUsDto';
import * as loki from 'lokijs';


@Injectable()
export class ManagementService {
    contactUsId = 4
    private readonly logger = new Logger(ManagementService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async addQueryToDB(createContactUsDto: CreateContactUsDto): Promise<boolean> {
        const contactUsTable = this.db.getCollection('contactUs')
        const newContactUsId = this.contactUsId++
        contactUsTable.insert({
            id: newContactUsId,
            name: createContactUsDto.name,
            email: createContactUsDto.email,
            subject: createContactUsDto.subject,
            message: createContactUsDto.message,
        })
        return true
    }


}
