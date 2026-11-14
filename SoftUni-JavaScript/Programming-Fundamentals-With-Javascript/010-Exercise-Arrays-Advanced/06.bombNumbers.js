function bombNumbers(sequence, [bomb, power]) {
    const numbers = [...sequence];
    let index = numbers.indexOf(bomb);
    while (index !== -1) {
        const start = Math.max(0, index - power);
        numbers.splice(start, index + power - start + 1);
        index = numbers.indexOf(bomb);
    }
    console.log(numbers.reduce((a, b) => a + b, 0));
}

module.exports = bombNumbers;
