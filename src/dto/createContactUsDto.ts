import { ApiProperty } from "@nestjs/swagger";

export class CreateContactUsDto {
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    subject: string;
    @ApiProperty()
    message: string;
}