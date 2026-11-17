function storeProvision(stock, ordered) {
    const store = {};
    const all = [...stock, ...ordered];
    for (let i = 0; i < all.length; i += 2) {
        store[all[i]] = (store[all[i]] ?? 0) + Number(all[i + 1]);
    }
    for (const [product, quantity] of Object.entries(store)) {
        console.log(`${product} -> ${quantity}`);
    }
}

module.exports = storeProvision;
