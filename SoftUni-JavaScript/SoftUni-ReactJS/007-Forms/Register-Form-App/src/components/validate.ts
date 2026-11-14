export type RegisterData = {email: string; password: string; repeatPassword: string; country: string; terms: boolean};
export type Errors = Partial<Record<keyof RegisterData, string>>;

export function validate({email, password, repeatPassword, country, terms}: RegisterData): Errors {
    const errors: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (repeatPassword !== password) errors.repeatPassword = 'Passwords don\'t match';
    if (!country) errors.country = 'Choose a country';
    if (!terms) errors.terms = 'You must accept the terms';
    return errors;
}
