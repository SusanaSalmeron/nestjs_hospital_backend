import { Inject, Injectable, Logger } from '@nestjs/common';
import * as loki from 'lokijs'
import { User } from 'src/classes/user';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findUserByEmail(email: string): Promise<User> {
        const user = this.db.getCollection('users')
        const foundUser: User = user.findOne({ email: email })
        if (foundUser) {
            return new User(
                foundUser.name,
                foundUser.password,
                foundUser.email,
                foundUser.role,
                foundUser.id
            )
        } else {
            return null
        }
    }
}
