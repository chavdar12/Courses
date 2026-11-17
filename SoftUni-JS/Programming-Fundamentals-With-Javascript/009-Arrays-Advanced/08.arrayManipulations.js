function arrayManipulations([initial, ...commands]) {
    let numbers = initial.split(' ').map(Number);
    for (const command of commands) {
        const [name, first, second] = command.split(' ');
        const [a, b] = [Number(first), Number(second)];
        switch (name) {
            case 'Add':
                numbers.push(a);
                break;
            case 'Remove':
                numbers = numbers.filter((n) => n !== a);
                break;
            case 'RemoveAt':
                numbers.splice(a, 1);
                break;
            case 'Insert':
                numbers.splice(b, 0, a);
                break;
        }
    }
    console.log(numbers.join(' '));
}

module.exports = arrayManipulations;
