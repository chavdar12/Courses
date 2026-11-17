function travelTime(entries) {
    const countries = {};
    for (const entry of entries) {
        const [country, town, cost] = entry.split(' > ');
        countries[country] ??= {};
        const current = countries[country][town];
        countries[country][town] =
            current === undefined ? Number(cost) : Math.min(current, Number(cost));
    }
    Object.keys(countries)
        .sort((a, b) => a.localeCompare(b))
        .forEach((country) => {
            const towns = Object.entries(countries[country])
                .sort(([, a], [, b]) => a - b)
                .map(([town, cost]) => `${town} -> ${cost}`);
            console.log(`${country} -> ${towns.join(' ')}`);
        });
}

module.exports = travelTime;
