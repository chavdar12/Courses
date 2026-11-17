function inventory(lines) {
    const heroes = lines.map((line) => {
        const [name, level, items] = line.split(' / ');
        return { name, level: Number(level), items: items ? items.split(', ') : [] };
    });
    heroes.sort((a, b) => a.level - b.level);
    for (const hero of heroes) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items.sort((a, b) => a.localeCompare(b)).join(', ')}`);
    }
}

module.exports = inventory;
