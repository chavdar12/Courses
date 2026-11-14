export const imageUrl = {
    validator: (value) => /^https?:\/\/.+/.test(value),
    message: 'Image URL must start with http:// or https://'
};
