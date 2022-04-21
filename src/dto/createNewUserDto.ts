import { ApiProperty } from "@nestjs/swagger";

export class CreateNewUserDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly address: string;
    @ApiProperty()
    readonly postalZip: string;
    @ApiProperty()
    readonly region: string;
    @ApiProperty()
    readonly country: string;
    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly dob: string;
    @ApiProperty()
    readonly ssnumber: string;
    @ApiProperty()
    readonly company: string
}