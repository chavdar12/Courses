function train([wagonsLine, capacityLine, ...commands]) {
    const wagons = wagonsLine.split(' ').map(Number);
    const capacity = Number(capacityLine);
    for (const command of commands) {
        const [first, second] = command.split(' ');
        if (first === 'Add') {
            wagons.push(Number(second));
            continue;
        }
        const passengers = Number(first);
        const index = wagons.findIndex((wagon) => wagon + passengers <= capacity);
        if (index !== -1) {
            wagons[index] += passengers;
        }
    }
    console.log(wagons.join(' '));
}

module.exports = train;
