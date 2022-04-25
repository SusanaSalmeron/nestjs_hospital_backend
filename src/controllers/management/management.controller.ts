import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ManagementService } from 'src/services/management.service';
import { CreateContactUsDto } from 'src/dto/createContactUsDto';
import { EmailService } from 'src/services/email.service';


@Controller('management')
export class ManagementController {
    private readonly logger = new Logger(ManagementController.name)
    constructor(private managementService: ManagementService, private emailService: EmailService) { }

    @Post('/contact')
    @ApiBody({
        description: "contact us form",
        required: true,
        type: CreateContactUsDto
    })
    @ApiCreatedResponse()
    @ApiBadRequestResponse()
    async contactUs(@Res() response, @Body() createContactUsDto: CreateContactUsDto) {
        try {
            const message = await this.managementService.addQueryToDB(createContactUsDto)
            await this.emailService.sendEmail(createContactUsDto.email)
            this.logger.log('added to database')
            response.status(HttpStatus.CREATED).json(message)
        } catch (err) {
            this.logger.error('Bad Request', err)
            response.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad Request' })
        }
    }
}
