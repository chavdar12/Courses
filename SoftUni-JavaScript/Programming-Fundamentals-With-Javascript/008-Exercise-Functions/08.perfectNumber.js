function perfectNumber(number) {
    let sum = 0;
    for (let d = 1; d <= number / 2; d++) {
        if (number % d === 0) {
            sum += d;
        }
    }
    console.log(number > 0 && sum === number ? 'We have a perfect number!' : "It's not so perfect.");
}

module.exports = perfectNumber;
