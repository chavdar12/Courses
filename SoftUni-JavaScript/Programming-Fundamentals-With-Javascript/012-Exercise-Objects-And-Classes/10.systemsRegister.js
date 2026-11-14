function systemsRegister(lines) {
    // system -> component -> [subcomponents]
    const systems = new Map();
    for (const line of lines) {
        const [system, component, subcomponent] = line.split(' | ');
        if (!systems.has(system)) {
            systems.set(system, new Map());
        }
        const components = systems.get(system);
        if (!components.has(component)) {
            components.set(component, []);
        }
        components.get(component).push(subcomponent);
    }
    [...systems]
        .sort(([nameA, a], [nameB, b]) => b.size - a.size || nameA.toLowerCase().localeCompare(nameB.toLowerCase()))
        .forEach(([system, components]) => {
            console.log(system);
            [...components].sort(([, a], [, b]) => b.length - a.length).forEach(([component, subs]) => {
                console.log(`|||${component}`);
                subs.forEach((sub) => console.log(`||||||${sub}`));
            });
        });
}

module.exports = systemsRegister;
