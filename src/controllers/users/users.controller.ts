import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Token } from 'src/classes/token';
import { CreateUserDto } from 'src/dto/createUserDto';
import { CreateNewUserDto } from 'src/dto/createNewUserDto';
import { UsersService } from 'src/services/users.service';
import { TokenService } from 'src/services/token.service';
import { PatientsService } from 'src/services/patients.service';
import { ValidationService } from 'src/services/validation.service';


@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private usersService: UsersService, private tokenService: TokenService, private patientsService: PatientsService, private validationService: ValidationService) { }

    @Post('/login')
    @ApiBody({
        description: 'User',
        required: true,
        type: CreateUserDto
    })
    @ApiOkResponse({ description: 'User Login successfully' })
    @ApiNotFoundResponse({ description: 'User does not exists' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async userLogin(@Res() response, @Body() createUserDto: CreateUserDto) {
        const { email, password } = createUserDto
        try {
            const user = await this.usersService.findUserByEmail(email)
            if (!user) {
                this.logger.error('User not found')
                response.status(HttpStatus.NOT_FOUND).json({ error: "User not found" })
            } else if (password === user.password) {
                this.logger.debug('Login successfully')
                const token = await this.tokenService.createToken(user)
                response.status(HttpStatus.OK).json({ name: user.name, id: user.id, token: token })
            } else {
                this.logger.error('Password or/and email error')
                response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Password or/and email error' })
            }
        } catch (err) {
            this.logger.error('Internal Server Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Internal Server Error')
        }
    }

    @Post('/register')
    @ApiBody({
        description: 'new user',
        required: true,
        type: CreateNewUserDto
    })
    @ApiCreatedResponse({ description: 'User registered successfully' })
    @ApiBadRequestResponse({ description: 'Email already exists' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async userSignup(@Res() response, @Body() createNewUserDto: CreateNewUserDto) {
        try {
            const emailValidated = this.validationService.validateEmail(createNewUserDto.email)
            const passwordValidated = this.validationService.validatePassword(createNewUserDto.password)
            if (emailValidated && passwordValidated) {
                const { email, password, name, address, postalZip, region, country, phone, dob, ssnumber, company } = createNewUserDto
                const newId = await this.usersService.signup(email, password, name)
                if (newId) {
                    this.patientsService.addPatientToDB(name, address, email, postalZip, region, country, phone, newId, dob, ssnumber, company)
                    const user = new Token(
                        name,
                        "patient",
                        email,
                    )
                    const token = await this.tokenService.createToken(user)
                    this.logger.log('user create sucessfully')
                    response.status(HttpStatus.CREATED).json({ name: user.name, token: token, id: newId })
                } else {
                    this.logger.error('Email already exists')
                    response.status(HttpStatus.BAD_REQUEST).json({ message: 'Email already exists', field: 'email' })
                }
            } else {
                this.logger.error('Email and/or password not validated')
                response.status(HttpStatus.BAD_REQUEST).json({ error: 'Email and/or password not validated' })
            }
        } catch (err) {
            this.logger.error('Internal Error', err)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }
}
