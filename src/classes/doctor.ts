export class Doctor {
    id: number;
    name: string;
    email: string;
    speciality: string;
    photo: string;

    constructor(id, name, email, speciality, photo) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.speciality = speciality;
        this.photo = photo;
    }
}