function employees(names) {
    const list = Object.fromEntries(names.map((name) => [name, name.length]));
    for (const [name, number] of Object.entries(list)) {
        console.log(`Name: ${name} -- Personal Number: ${number}`);
    }
}

module.exports = employees;
