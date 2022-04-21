import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
    @ApiProperty()
    readonly pickedDate: string;
    @ApiProperty()
    readonly doctor: number;

}

