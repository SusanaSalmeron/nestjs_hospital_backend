import { Inject, Injectable, Logger } from '@nestjs/common';
import * as loki from 'lokijs'

@Injectable()
export class DiseasesService {
    private readonly logger = new Logger(DiseasesService.name);
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findAll(): Promise<string[]> {
        this.logger.log('Getting diseases')
        const diseasesTable = this.db.getCollection('diseases')
        const diseases = diseasesTable.find(true)
        return diseases.map(d => d.name)
    }
}