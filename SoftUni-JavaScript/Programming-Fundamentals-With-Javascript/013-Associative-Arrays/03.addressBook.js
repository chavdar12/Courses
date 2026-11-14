function addressBook(entries) {
    const book = {};
    for (const entry of entries) {
        const [name, address] = entry.split(':');
        book[name] = address;
    }
    Object.keys(book)
        .sort((a, b) => a.localeCompare(b))
        .forEach((name) => console.log(`${name} -> ${book[name]}`));
}

module.exports = addressBook;
