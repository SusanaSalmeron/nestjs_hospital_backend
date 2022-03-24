import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DiseasesService {
    private readonly logger = new Logger(DiseasesService.name);
    private readonly diseases: string[] = [
        'Alphaviruses',
        'Alzheimer Diseases',
        'Arthritis',
        'Babesiosis',
        'Cancer - Breast',
    ];

    findAll() {
        this.logger.log('Getting diseases')
        return this.diseases;
    }
}