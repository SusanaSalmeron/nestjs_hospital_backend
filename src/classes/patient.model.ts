export class Patient {
    name: string;
    address: string;
    email: string;
    postalZip: string;
    region: string;
    country: string;
    phone: string;
    id: number;
    dob: string;
    ssnumber: string;
    company: string;

    constructor(name, address, email, postalZip, region, country, phone, id, dob, ssnumber, company) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.postalZip = postalZip;
        this.region = region;
        this.country = country;
        this.phone = phone;
        this.id = id;
        this.dob = dob;
        this.ssnumber = ssnumber;
        this.company = company
    }
}
