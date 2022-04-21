import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CheckLoginTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  private readonly logger = new Logger(CheckLoginTokenMiddleware.name)
  use(req: Request | any, res: Response, next: () => void) {
    const authHeader = req.headers.authorization
    if (authHeader) {
    } else {
      next();
    }

  }
}
