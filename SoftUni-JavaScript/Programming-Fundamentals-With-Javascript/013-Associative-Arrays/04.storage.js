function storage(entries) {
    const items = new Map();
    for (const entry of entries) {
        const [item, quantity] = entry.split(' ');
        items.set(item, (items.get(item) ?? 0) + Number(quantity));
    }
    for (const [item, quantity] of items) {
        console.log(`${item} -> ${quantity}`);
    }
}

module.exports = storage;
