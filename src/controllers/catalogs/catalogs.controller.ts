import { Controller, Get, HttpStatus, Res, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { DiseasesService } from '../../services/diseases.service';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../classes/doctor';



@Controller('catalogs')
export class CatalogController {
    private readonly logger = new Logger(DiseasesService.name)
    constructor(private diseasesService: DiseasesService, private doctorsService: DoctorsService) { }

    @Get('diseases')
    @ApiOkResponse({ description: 'find diseases successfully' })
    @ApiForbiddenResponse({ description: 'No token found' })
    @ApiNotFoundResponse({ description: 'diseases not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getAllDiseases(@Res() response) {
        try {
            const diseases: string[] = await this.diseasesService.findAll()
            if (diseases) {
                this.logger.log('find diseases successfully')
                response.status(HttpStatus.OK).json(diseases)
            } else {
                this.logger.error('diseases not found')
                response.send('diseases not found').status(HttpStatus.NOT_FOUND)
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Error')
        }
    }

    @Get('doctors')
    @ApiOkResponse({ description: 'find doctors successfully' })
    @ApiNotFoundResponse({ description: 'doctors not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getAllDoctors(@Res() response) {
        try {
            const doctors: Doctor[] = await this.doctorsService.findAll()
            if (doctors) {
                this.logger.log('get doctors successfully')
                response.status(HttpStatus.OK).json(doctors)
            } else {
                this.logger.error('doctors not found')
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Error')
        }
    }
}