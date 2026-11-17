function catalogue(lines) {
    const products = lines
        .map((line) => line.split(' : '))
        .sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let initial = '';
    for (const [name, price] of products) {
        if (name[0].toUpperCase() !== initial) {
            initial = name[0].toUpperCase();
            console.log(initial);
        }
        console.log(`  ${name}: ${Number(price)}`);
    }
}

module.exports = catalogue;
