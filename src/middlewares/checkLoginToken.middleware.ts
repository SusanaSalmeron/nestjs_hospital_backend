import { Injectable, Logger, NestMiddleware } from '@nestjs/common';


@Injectable()
export class CheckLoginTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CheckLoginTokenMiddleware.name)
  use(req: Request | any, res: Response, next: () => void) {
    const authHeader = req.headers.authorization
    if (authHeader) {
    } else {
      next();
    }

  }
}
