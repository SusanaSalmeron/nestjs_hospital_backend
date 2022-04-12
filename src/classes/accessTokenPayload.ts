export class AccessTokenPayload {
    userId: number;
    role: string;

    contructor(userId, role) {
        this.userId = userId;
        this.role = role
    }
}