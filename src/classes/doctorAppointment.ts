import { ApiProperty } from "@nestjs/swagger";

export class DoctorAppointment {
    @ApiProperty()
    id: number;
    @ApiProperty()
    doctorId: number;
    @ApiProperty()
    patientId: number;
    @ApiProperty()
    patientName: string;
    @ApiProperty()
    pickedDate: string;

    constructor(id, doctorId, patientId, patientName, pickedDate) {
        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.pickedDate = pickedDate
    }
}

