function integerAndFloat(a, b, c) {
    const sum = a + b + c;
    console.log(`${sum} - ${Number.isInteger(sum) ? 'Integer' : 'Float'}`);
}

module.exports = integerAndFloat;
