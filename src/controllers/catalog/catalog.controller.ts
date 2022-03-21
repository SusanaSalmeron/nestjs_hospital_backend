import { Controller, Get } from '@nestjs/common';
import { DiseasesService } from 'src/services/diseases.service';
import { DoctorsService } from 'src/services/doctors.service';
import { Doctor } from 'src/classes/doctor';

@Controller('catalog')
export class CatalogController {
    constructor(private diseasesService: DiseasesService, private doctorsService: DoctorsService) { }

    @Get('diseases')
    async getAllDiseases(): Promise<string[]> {
        return this.diseasesService.findAll()
    }

    @Get('doctors')
    async getAllDoctors(): Promise<Doctor[]> {
        return this.doctorsService.findAll()
    }
}