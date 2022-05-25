import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;

    constructor(email, password) {
        this.password = password;
        this.email = email;
    }
}    