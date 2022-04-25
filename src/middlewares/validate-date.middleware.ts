import { BadRequestException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

@Injectable()
export class ValidateDateMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ValidateDateMiddleware.name)
  async use(req: Request | any, res: Response, next: () => void) {
    const pickedDate = req.body.pickedDate
    const formattedDate = dayjs(pickedDate, 'DD-MM-YYYY', 'es')
    if (formattedDate.isValid() && formattedDate.unix() >= dayjs().unix()) {
      this.logger.log('date is valid')
      next()
    } else {
      this.logger.error('Invalid Date')
      throw new BadRequestException('Invalid Date')
    }
  }
}
