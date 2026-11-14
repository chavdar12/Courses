function sumDigits(number) {
    console.log([...String(number)].reduce((acc, digit) => acc + Number(digit), 0));
}

module.exports = sumDigits;
