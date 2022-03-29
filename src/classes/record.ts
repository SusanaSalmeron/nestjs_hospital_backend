export class Record {
    recordId: number;
    date: string;
    id: number;
    description: string;
    diagnostics: string;

    constructor(recordId, date, id, description, diagnostics) {
        this.recordId = recordId;
        this.date = date;
        this.id = id;
        this.description = description;
        this.diagnostics = diagnostics
    }
}
