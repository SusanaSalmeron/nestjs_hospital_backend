import { ApiProperty } from "@nestjs/swagger";

export class DeleteAppointDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly appId: string;

    constructor(id, appId) {
        this.id = id;
        this.appId = appId;
    }
}