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

    constructor(name, email, password, role, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.id = id
    }
}