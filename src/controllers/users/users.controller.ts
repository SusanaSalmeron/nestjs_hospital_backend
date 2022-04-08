import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/createUserDto';
import { UsersService } from 'src/services/users.service';
import { TokenService } from 'src/services/token.service';


@Controller('user')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private usersService: UsersService, private tokenService: TokenService) { }

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
}
