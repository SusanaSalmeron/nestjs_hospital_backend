import { Injectable } from '@nestjs/common';

@Injectable()
export class DiseasesService {
    private readonly diseases: string[] = [
        'Alphaviruses',
        'Alzheimer Diseases',
        'Arthritis',
        'Babesiosis',
        'Cancer - Breast',
    ];
    findAll() {
        return this.diseases;
    }
}
