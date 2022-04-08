import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly email: string;

    constructor(password, email) {
        this.password = password;
        this.email = email;
    }
}    