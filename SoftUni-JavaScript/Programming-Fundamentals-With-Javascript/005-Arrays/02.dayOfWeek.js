function dayOfWeek(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    console.log(days[day - 1] ?? 'Invalid day!');
}

module.exports = dayOfWeek;
