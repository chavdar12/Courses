function sumEvenNumbers(arr) {
    console.log(arr.map(Number).filter((n) => n % 2 === 0).reduce((a, b) => a + b, 0));
}

module.exports = sumEvenNumbers;
