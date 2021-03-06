import { ForbiddenException, Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticateTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  private readonly logger = new Logger(AuthenticateTokenMiddleware.name)
  async use(req: Request | any, res: Response, next: () => void) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      this.logger.error('No token found')
      throw new ForbiddenException('No token found');
    }
    const token = authHeader.split(' ')[1]
    try {
      const secretkey = this.configService.get<string>('SECRET_KEY')
      //TODO - role any -
      const { role }: any = jwt.verify(token, secretkey)
      req.role = role
      this.logger.log('Token Verified')
      next()
    }
    catch (err) {
      this.logger.error('Can not verify token', err)
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
