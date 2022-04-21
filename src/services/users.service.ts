import { Inject, Injectable, Logger } from '@nestjs/common';
import * as loki from 'lokijs'
import { User } from 'src/classes/user';

@Injectable()
export class UsersService {
    userId = 10040
    private readonly logger = new Logger(UsersService.name)
    constructor(@Inject('DATABASE_CONNECTION') private db: loki) { }

    async findUserByEmail(email: string): Promise<User> {
        const userTable = this.db.getCollection('users')
        const foundUser: User = userTable.findOne({ email: email })
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

    async signup(userEmail, userPassword, userName): Promise<number> {
        const usersTable = this.db.getCollection('users')
        const foundUser = usersTable.findOne({ email: userEmail })
        if (!foundUser) {
            this.logger.log("Creating new user")
            const newUserId = this.userId++
            usersTable.insert({
                name: userName,
                password: userPassword,
                email: userEmail,
                role: "patient",
                id: newUserId
            })
            return newUserId
        }
        return null
    }
}
