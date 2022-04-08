import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
    @ApiProperty()
    readonly pickedDate: string;
    @ApiProperty()
    readonly doctorId: number;

    constructor(pickedDate, doctorId) {
        this.pickedDate = pickedDate;
        this.doctorId = doctorId;
    }
}

