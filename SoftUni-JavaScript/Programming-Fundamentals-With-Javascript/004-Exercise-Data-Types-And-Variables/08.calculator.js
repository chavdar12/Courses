function calculator(a, operator, b) {
    const operations = {
        '+': a + b,
        '-': a - b,
        '*': a * b,
        '/': a / b,
    };
    console.log(operations[operator].toFixed(2));
}

module.exports = calculator;
