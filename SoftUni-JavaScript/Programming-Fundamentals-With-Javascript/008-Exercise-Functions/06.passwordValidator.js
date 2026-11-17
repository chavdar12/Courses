function passwordValidator(password) {
    const errors = [];
    if (password.length < 6 || password.length > 10) {
        errors.push('Password must be between 6 and 10 characters');
    }
    if (!/^[A-Za-z0-9]*$/.test(password)) {
        errors.push('Password must consist only of letters and digits');
    }
    if ((password.match(/\d/g) ?? []).length < 2) {
        errors.push('Password must have at least 2 digits');
    }
    (errors.length ? errors : ['Password is valid']).forEach((message) => console.log(message));
}

module.exports = passwordValidator;
