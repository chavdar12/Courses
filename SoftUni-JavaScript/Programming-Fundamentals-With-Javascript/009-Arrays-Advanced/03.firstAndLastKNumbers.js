function firstAndLastKNumbers([k, ...numbers]) {
    console.log(numbers.slice(0, k).join(' '));
    console.log(numbers.slice(-k).join(' '));
}

module.exports = firstAndLastKNumbers;
