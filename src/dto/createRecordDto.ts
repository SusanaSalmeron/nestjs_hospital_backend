import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordDto {
    @ApiProperty()
    readonly diagnostics: string;
    @ApiProperty()
    readonly description: string;

    constructor(diagnostics, description) {
        this.diagnostics = diagnostics;
        this.description = description
    }
}