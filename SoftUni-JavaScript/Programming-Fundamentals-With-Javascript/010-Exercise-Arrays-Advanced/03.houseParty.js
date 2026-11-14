function houseParty(commands) {
    const guests = [];
    for (const command of commands) {
        const name = command.split(' ')[0];
        const index = guests.indexOf(name);
        if (command.includes(' not ')) {
            if (index === -1) {
                console.log(`${name} is not in the list!`);
            } else {
                guests.splice(index, 1);
            }
        } else if (index !== -1) {
            console.log(`${name} is already in the list!`);
        } else {
            guests.push(name);
        }
    }
    guests.forEach((guest) => console.log(guest));
}

module.exports = houseParty;
