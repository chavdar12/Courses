function arrayManipulator(numbers, commands) {
    let arr = [...numbers];
    for (const command of commands) {
        const [name, ...args] = command.split(' ');
        const values = args.map(Number);
        switch (name) {
            case 'add':
                arr.splice(values[0], 0, values[1]);
                break;
            case 'addMany':
                arr.splice(values[0], 0, ...values.slice(1));
                break;
            case 'contains':
                console.log(arr.indexOf(values[0]));
                break;
            case 'remove':
                arr.splice(values[0], 1);
                break;
            case 'shift': {
                const shift = values[0] % arr.length;
                arr = [...arr.slice(shift), ...arr.slice(0, shift)];
                break;
            }
            case 'sumPairs':
                arr = arr.filter((_, i) => i % 2 === 0).map((n, i) => n + (arr[i * 2 + 1] ?? 0));
                break;
            case 'print':
                // Explicit format: console.log(arr) wraps arrays longer than 6 items over several lines.
                console.log(`[ ${arr.join(', ')} ]`);
                return;
        }
    }
}

module.exports = arrayManipulator;
