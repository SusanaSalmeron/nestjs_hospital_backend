import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    role: string;
    @ApiProperty()
    id: number

    constructor(name, password, email, role, id) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.id = id
    }
}