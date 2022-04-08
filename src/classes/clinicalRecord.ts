import { ApiProperty } from "@nestjs/swagger";
import { Record } from "./record";

export class ClinicalRecord {
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    company: string;
    @ApiProperty()
    dob: string;
    @ApiProperty()
    records: Record[]

    constructor(name, address, company, dob, records) {
        this.name = name;
        this.address = address;
        this.company = company;
        this.dob = dob;
        this.records = records;
    }
}