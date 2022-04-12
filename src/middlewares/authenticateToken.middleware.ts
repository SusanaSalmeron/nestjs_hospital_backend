import { ForbiddenException, Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from 'src/classes/accessTokenPayload';

@Injectable()
export class AuthenticateTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  private readonly logger = new Logger(AuthenticateTokenMiddleware.name)
  async use(req: Request | any, res: Response, next: () => void) {
    const authHeader = req.headers.authorization
    if (!authHeader) {

      throw new ForbiddenException('No token found');
    }
    const token = authHeader.split(' ')[1]
    try {
      const secretkey = this.configService.get<string>('SECRET_KEY')
      //TODO - role any -
      const { role }: any = verify(token, secretkey)
      req.role = role
      this.logger.log('Token Verified')
      next()
    }
    catch (err) {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
