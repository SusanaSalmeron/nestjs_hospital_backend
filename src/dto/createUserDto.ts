import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly email: string;

    constructor(email, password) {
        this.password = password;
        this.email = email;
    }
}    