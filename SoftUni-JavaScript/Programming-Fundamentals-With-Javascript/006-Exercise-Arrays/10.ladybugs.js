function ladybugs([size, positions, ...commands]) {
    const field = new Array(Number(size)).fill(0);
    const inField = (i) => i >= 0 && i < field.length;
    positions.split(' ').map(Number).filter(inField).forEach((i) => { field[i] = 1; });

    for (const command of commands) {
        const [start, direction, length] = command.split(' ');
        let index = Number(start);
        if (!inField(index) || field[index] === 0) {
            continue;
        }
        field[index] = 0;
        const step = direction === 'right' ? Number(length) : -Number(length);
        index += step;
        // A zero step lands back on the (now empty) start, so the loop cannot spin forever.
        while (inField(index) && field[index] === 1) {
            index += step;
        }
        if (inField(index)) {
            field[index] = 1;
        }
    }
    console.log(field.join(' '));
}

module.exports = ladybugs;
