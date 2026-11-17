function phoneBook(entries) {
    const book = {};
    for (const entry of entries) {
        const [name, phone] = entry.split(' ');
        book[name] = phone;
    }
    for (const [name, phone] of Object.entries(book)) {
        console.log(`${name} -> ${phone}`);
    }
}

module.exports = phoneBook;
