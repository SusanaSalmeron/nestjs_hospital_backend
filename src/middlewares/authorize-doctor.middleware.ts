import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthorizeDoctorMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthorizeDoctorMiddleware.name)
  async use(req: Request | any, res: Response, next: () => void) {
    const role = req.role
    if (role === "sanitario") {
      next()
    } else {
      this.logger.error('User not authorized')
      throw new ForbiddenException('Unauthorized User')
    }
  }
}
