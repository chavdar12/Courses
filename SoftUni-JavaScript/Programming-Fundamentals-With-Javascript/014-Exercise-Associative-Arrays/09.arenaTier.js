function arenaTier(lines) {
    // gladiator -> { technique: skill }
    const pool = new Map();
    const total = (techniques) => Object.values(techniques).reduce((a, b) => a + b, 0);

    for (const line of lines) {
        if (line === 'Ave Cesar') {
            break;
        }
        if (line.includes(' -> ')) {
            const [gladiator, technique, skill] = line.split(' -> ');
            const techniques = pool.get(gladiator) ?? {};
            techniques[technique] = Math.max(techniques[technique] ?? 0, Number(skill));
            pool.set(gladiator, techniques);
            continue;
        }
        const [first, second] = line.split(' vs ');
        const a = pool.get(first);
        const b = pool.get(second);
        if (!a || !b || !Object.keys(a).some((technique) => technique in b)) {
            continue;
        }
        if (total(a) > total(b)) {
            pool.delete(second);
        } else if (total(b) > total(a)) {
            pool.delete(first);
        }
    }

    [...pool]
        .sort(([nameA, a], [nameB, b]) => total(b) - total(a) || nameA.localeCompare(nameB))
        .forEach(([name, techniques]) => {
            console.log(`${name}: ${total(techniques)} skill`);
            Object.entries(techniques)
                .sort(([techA, a], [techB, b]) => b - a || techA.localeCompare(techB))
                .forEach(([technique, skill]) => console.log(`- ${technique} <!> ${skill}`));
        });
}

module.exports = arenaTier;
