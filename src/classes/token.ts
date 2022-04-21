export class Token {
    name: string;
    role: string;
    email: string;

    constructor(name, role, email) {
        this.name = name;
        this.role = role;
        this.email = email;
    }
}