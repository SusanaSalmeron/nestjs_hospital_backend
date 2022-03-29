
export class Appointment {
    id: number;
    pickedDate: string;
    doctor: string;
    doctorId: number;

    constructor(id, pickedDate, doctor, doctorId) {
        this.id = id;
        this.pickedDate = pickedDate;
        this.doctor = doctor;
        this.doctorId = doctorId;
    }
}

