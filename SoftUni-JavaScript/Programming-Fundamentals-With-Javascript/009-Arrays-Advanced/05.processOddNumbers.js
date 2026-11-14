function processOddNumbers(arr) {
    console.log(arr.filter((_, i) => i % 2 === 1).map((n) => n * 2).reverse().join(' '));
}

module.exports = processOddNumbers;
