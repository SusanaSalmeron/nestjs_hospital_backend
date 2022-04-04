import { ApiProperty } from "@nestjs/swagger";

export class Appointment {
    @ApiProperty()
    id: number;
    @ApiProperty()
    pickedDate: string;
    @ApiProperty()
    doctor: string;
    @ApiProperty()
    doctorId: number;

    constructor(id, pickedDate, doctor, doctorId) {
        this.id = id;
        this.pickedDate = pickedDate;
        this.doctor = doctor;
        this.doctorId = doctorId;
    }
}

