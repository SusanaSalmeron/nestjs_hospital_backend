import { ApiProperty } from "@nestjs/swagger";

export class Patient {
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    postalZip: string;
    @ApiProperty()
    region: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    id: number;
    @ApiProperty()
    dob: string;
    @ApiProperty()
    ssnumber: string;
    @ApiProperty()
    company: string;

    constructor(name, address, email, postalZip, region, country, phone, id, dob, ssnumber, company) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.postalZip = postalZip;
        this.region = region;
        this.country = country;
        this.phone = phone;
        this.id = id;
        this.dob = dob;
        this.ssnumber = ssnumber;
        this.company = company
    }
}
