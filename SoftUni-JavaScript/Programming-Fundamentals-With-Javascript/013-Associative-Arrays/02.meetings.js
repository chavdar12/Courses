function meetings(entries) {
    const schedule = {};
    for (const entry of entries) {
        const [day, name] = entry.split(' ');
        if (day in schedule) {
            console.log(`Conflict on ${day}!`);
        } else {
            schedule[day] = name;
            console.log(`Scheduled for ${day}`);
        }
    }
    for (const [day, name] of Object.entries(schedule)) {
        console.log(`${day} -> ${name}`);
    }
}

module.exports = meetings;
