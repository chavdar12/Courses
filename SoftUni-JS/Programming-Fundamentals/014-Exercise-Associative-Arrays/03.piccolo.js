function piccolo(entries) {
    const parking = new Set();
    for (const entry of entries) {
        const [direction, car] = entry.split(', ');
        if (direction === 'IN') {
            parking.add(car);
        } else {
            parking.delete(car);
        }
    }
    if (parking.size === 0) {
        console.log('Parking Lot is Empty');
        return;
    }
    [...parking].sort((a, b) => a.localeCompare(b)).forEach((car) => console.log(car));
}

module.exports = piccolo;
