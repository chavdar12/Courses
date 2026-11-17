const LEGENDARIES = { shards: 'Shadowmourne', fragments: 'Valanyr', motes: 'Dragonwrath' };

function legendaryFarming(input) {
    const key = { shards: 0, fragments: 0, motes: 0 };
    const junk = {};
    const tokens = input.split(' ');
    for (let i = 0; i < tokens.length; i += 2) {
        const quantity = Number(tokens[i]);
        const material = tokens[i + 1].toLowerCase();
        if (!(material in key)) {
            junk[material] = (junk[material] ?? 0) + quantity;
            continue;
        }
        key[material] += quantity;
        if (key[material] >= 250) {
            key[material] -= 250;
            console.log(`${LEGENDARIES[material]} obtained!`);
            break;
        }
    }
    Object.entries(key)
        .sort(([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB))
        .forEach(([name, quantity]) => console.log(`${name}: ${quantity}`));
    Object.keys(junk)
        .sort((a, b) => a.localeCompare(b))
        .forEach((name) => console.log(`${name}: ${junk[name]}`));
}

module.exports = legendaryFarming;
