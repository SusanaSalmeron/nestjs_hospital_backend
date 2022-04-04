import { ApiProperty } from "@nestjs/swagger";

export class Record {
    @ApiProperty()
    recordId: number;
    @ApiProperty()
    date: string;
    @ApiProperty()
    id: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    diagnostics: string;

    constructor(recordId, date, id, description, diagnostics) {
        this.recordId = recordId;
        this.date = date;
        this.id = id;
        this.description = description;
        this.diagnostics = diagnostics
    }
}
