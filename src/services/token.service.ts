import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
    constructor(private readonly configService: ConfigService) { }
    private readonly logger = new Logger(TokenService.name)

    async createToken(user): Promise<string> {
        const date = dayjs().add(5, 'minutes').unix()
        const claims = {
            role: user.role,
            id: user.id,
            expiration: date
        }
        const secretKey = this.configService.get<string>('SECRET_KEY')
        console.log(jwt.sign(claims, secretKey))
        return await jwt.sign(claims, secretKey)
    }
}