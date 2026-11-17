function schoolGrades(entries) {
    const students = new Map();
    for (const entry of entries) {
        const [name, ...grades] = entry.split(' ');
        students.set(name, [...(students.get(name) ?? []), ...grades.map(Number)]);
    }
    const average = (grades) => grades.reduce((a, b) => a + b, 0) / grades.length;
    [...students]
        .sort(([, a], [, b]) => average(a) - average(b))
        .forEach(([name, grades]) => console.log(`${name}: ${grades.join(', ')}`));
}

module.exports = schoolGrades;
