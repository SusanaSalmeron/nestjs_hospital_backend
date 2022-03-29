export class DoctorAppointment {
    id: number;
    doctorId: number;
    patientId: number;
    patientName: string;
    pickedDate: string;

    constructor(id, doctorId, patientId, patientName, pickedDate) {
        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.pickedDate = pickedDate
    }
}

