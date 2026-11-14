function neighborhoods([list, ...people]) {
    const map = new Map(list.split(', ').map((name) => [name, []]));
    for (const line of people) {
        const [neighborhood, person] = line.split(' - ');
        map.get(neighborhood)?.push(person);
    }
    [...map]
        .sort(([, a], [, b]) => b.length - a.length)
        .forEach(([name, inhabitants]) => {
            console.log(`${name}: ${inhabitants.length}`);
            inhabitants.forEach((person) => console.log(`--${person}`));
        });
}

module.exports = neighborhoods;
