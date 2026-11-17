export const imageUrl = {
    validator: (value) => /^https?:\/\/.+/.test(value),
    message: 'Image URL must start with http:// or https://',
};

export const englishText = (field) => ({
    validator: (value) => /^[a-zA-Z0-9 ]+$/.test(value),
    message: `${field} may contain only English letters, digits and whitespaces`,
});
