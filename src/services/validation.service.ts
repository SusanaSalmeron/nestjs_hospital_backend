import { Injectable } from '@nestjs/common';


@Injectable()
export class ValidationService {
    EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    async validateEmail(email: string): Promise<boolean> {
        return this.EMAIL_REGEX.test(email.toLocaleLowerCase())
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.PASSWORD_REGEX.test(password)
    }
}
