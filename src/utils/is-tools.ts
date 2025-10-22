export class IsTools {
    static isPhoneNumber(value: string): boolean {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return phoneRegex.test(value);
    }

    static isEmail(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
}
